import { maydayAudioFile, type MaydayLine } from "./content";
import { chooseVoice, loadVoices, speak, type VoiceSettings } from "./voice";

// Plays the Mayday call. Browsers only allow sound after a tap,
// so start() must be called from a click.
//
// 1. If public/mayday.mp3 exists, it plays that recording through a
//    radio filter so it sounds like it's coming over the handset.
// 2. Otherwise it plays radio static and squelch while the transcript types out.
//    Santa's lines use the device's computer voice (see voice.ts), unless switched off.

export type RadioMode = "talk" | "static" | "idle";

type Callbacks = {
  onLine: (index: number) => void;
  onMode: (mode: RadioMode) => void;
  onDone: () => void;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const TYPE_MS_PER_CHAR = 38; // keep in step with the typewriter in Intro.tsx

export class MaydayPlayer {
  private ctx: AudioContext | null = null;
  private noiseGain: GainNode | null = null;
  private noiseSrc: AudioBufferSourceNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private audio: HTMLAudioElement | null = null;
  private stopped = false;

  constructor(private lines: MaydayLine[], private cb: Callbacks, private voiceSettings: VoiceSettings) {}

  async start() {
    this.stopped = false;
    this.startAudio();
    this.squelch();
    await wait(250);
    const recording = await this.findRecording();
    if (this.stopped) return;
    if (recording) await this.playRecording(recording);
    else await this.playTranscript();
    if (this.stopped) return;
    // The radio cuts out: a final burst of static, a squelch, then silence.
    this.cb.onMode("static");
    this.setStatic(0.45);
    await wait(900);
    this.setStatic(0);
    this.squelch();
    this.cb.onMode("idle");
    await wait(700);
    this.stop();
    this.cb.onDone();
  }

  stop() {
    this.stopped = true;
    try { window.speechSynthesis?.cancel(); } catch { /* not supported */ }
    if (this.audio) { this.audio.pause(); this.audio = null; }
    try { this.noiseSrc?.stop(); } catch { /* already stopped */ }
    this.ctx?.close().catch(() => undefined);
    this.ctx = null;
  }

  // ---------- static and squelch ----------
  private startAudio() {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (Math.random() < 0.002 ? 3 : 1); // noise with crackles
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 1800;
      band.Q.value = 0.6;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(band).connect(gain).connect(ctx.destination);
      src.start();
      this.ctx = ctx;
      this.noiseSrc = src;
      this.noiseGain = gain;
      this.noiseBuffer = buffer;
    } catch {
      /* no Web Audio: carry on silently */
    }
  }

  private setStatic(level: number) {
    if (!this.ctx || !this.noiseGain) return;
    this.noiseGain.gain.setTargetAtTime(level, this.ctx.currentTime, 0.04);
  }

  // The short "kssht" when a radio keys up or drops out.
  private squelch() {
    if (!this.ctx || !this.noiseBuffer) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2500;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    src.connect(hp).connect(g).connect(ctx.destination);
    src.start(t, Math.random());
    src.stop(t + 0.14);
  }

  // ---------- recording ----------
  private async findRecording(): Promise<string | null> {
    const url = import.meta.env.BASE_URL + maydayAudioFile;
    try {
      const res = await fetch(url, { method: "HEAD" });
      const type = res.headers.get("content-type") || "";
      return res.ok && type.startsWith("audio") ? url : null;
    } catch {
      return null;
    }
  }

  private playRecording(url: string): Promise<void> {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.crossOrigin = "anonymous";
      this.audio = audio;
      this.radioFilter(audio);
      this.setStatic(0.04);
      this.cb.onMode("talk");
      // Reveal transcript lines in step with how far through the recording we are.
      const weights = this.lines.map((l) => l.text.length + (l.staticAfter ?? 0) * 12);
      const total = weights.reduce((a, b) => a + b, 0);
      let shown = 0;
      this.cb.onLine(0);
      audio.ontimeupdate = () => {
        if (!audio.duration) return;
        const progress = (audio.currentTime / audio.duration) * total;
        let acc = 0;
        let idx = 0;
        for (let i = 0; i < weights.length; i++) {
          if (progress >= acc) idx = i;
          acc += weights[i];
        }
        if (idx > shown) { shown = idx; this.cb.onLine(idx); }
      };
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });
  }

  // Makes a phone recording sound like a handheld radio:
  // cuts the lows and highs, then adds a little grit.
  private radioFilter(audio: HTMLAudioElement) {
    if (!this.ctx) return;
    try {
      const ctx = this.ctx;
      const src = ctx.createMediaElementSource(audio);
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 350;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3200;
      const grit = ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < curve.length; i++) {
        const x = (i / curve.length) * 2 - 1;
        curve[i] = Math.tanh(x * 2.2);
      }
      grit.curve = curve;
      const out = ctx.createGain();
      out.gain.value = 1.1;
      src.connect(hp).connect(lp).connect(grit).connect(out).connect(ctx.destination);
    } catch {
      /* filter not available: the recording still plays normally */
    }
  }

  // ---------- no recording: static + transcript ----------
  private async playTranscript() {
    const synth = this.voiceSettings.enabled ? window.speechSynthesis : undefined;
    const voice = synth ? chooseVoice(await loadVoices(), this.voiceSettings.name) : null;
    for (let i = 0; i < this.lines.length; i++) {
      if (this.stopped) return;
      const line = this.lines[i];
      this.cb.onLine(i);
      this.cb.onMode("talk");
      this.setStatic(0.06);
      const typing = wait(line.text.length * TYPE_MS_PER_CHAR + 650);
      await (synth ? Promise.all([typing, speak(line.text, voice, this.voiceSettings)]) : typing);
      if (this.stopped) return;
      if (line.staticAfter) {
        this.cb.onMode("static");
        this.setStatic(0.32);
        await wait(line.staticAfter * 1000);
      } else {
        await wait(300);
      }
    }
  }
}
