import { maydayAudioFile, type MaydayLine } from "./content";
import { chooseVoice, loadVoices, speak, type VoiceSettings } from "./voice";

// Plays the Mayday call. Browsers only allow sound after a tap,
// so start() must be called from a click.
//
// 1. If public/mayday.mp3 exists, it plays that recording through a
//    radio filter so it sounds like it's coming over the handset.
// 2. Otherwise it plays radio static and squelch while the transcript types out.
//    Santa's lines use the device's computer voice (see voice.ts), unless switched off,
//    with the storm and sound effects set per line in content.ts.

export type RadioMode = "talk" | "static" | "idle";

type Callbacks = {
  onLine: (index: number) => void;
  onMode: (mode: RadioMode) => void;
  onDone: () => void;
};

// Optional real recordings in public/sfx/. Any that are missing fall back to the synthesised versions below.
type Sample = "storm" | "crash";
const SAMPLE_NAMES: Sample[] = ["storm", "crash"];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const TYPE_MS_PER_CHAR = 38; // keep in step with the typewriter in Intro.tsx

export class MaydayPlayer {
  private ctx: AudioContext | null = null;
  private noiseGain: GainNode | null = null;
  private noiseSrc: AudioBufferSourceNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private audio: HTMLAudioElement | null = null;
  private stormGain: GainNode | null = null;
  private bus: AudioNode | null = null;
  private samples: Partial<Record<Sample, AudioBuffer>> = {};
  private stopped = false;

  constructor(private lines: MaydayLine[], private cb: Callbacks, private voiceSettings: VoiceSettings) {}

  async start() {
    this.stopped = false;
    this.startAudio();
    this.squelch();
    await wait(250);
    const [recording] = await Promise.all([this.findRecording(), this.loadSamples()]);
    if (this.stopped) return;
    if (recording) await this.playRecording(recording);
    else await this.playTranscript();
    if (this.stopped) return;
    // The radio cuts out: a final burst of static, a squelch, then silence.
    this.cb.onMode("static");
    this.setStatic(0.45);
    await wait(900);
    this.setStatic(0);
    this.setStorm(0);
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

  // ---------- sound effects (synthesised, no files) ----------
  // Everything Santa's handset "hears" goes through one radio bus: band-limited and
  // driven into soft clipping, so loud moments overload the radio like the real thing.
  private radioBus(): AudioNode | null {
    const ctx = this.ctx;
    if (!ctx) return null;
    if (!this.bus) {
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 220;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3600;
      const drive = ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < curve.length; i++) curve[i] = Math.tanh(((i / curve.length) * 2 - 1) * 3);
      drive.curve = curve;
      const out = ctx.createGain();
      out.gain.value = 0.8;
      hp.connect(lp).connect(drive).connect(out).connect(ctx.destination);
      this.bus = hp;
    }
    return this.bus;
  }

  private async loadSamples() {
    const ctx = this.ctx;
    if (!ctx) return;
    await Promise.all(SAMPLE_NAMES.map(async (name) => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}sfx/${name}.mp3`);
        if (!res.ok || !(res.headers.get("content-type") || "").startsWith("audio")) return;
        this.samples[name] = await ctx.decodeAudioData(await res.arrayBuffer());
      } catch { /* missing or undecodable: use the synthesised sound */ }
    }));
  }

  private playSample(buf: AudioBuffer, dest: AudioNode, loop = false) {
    const src = this.ctx!.createBufferSource();
    src.buffer = buf;
    src.loop = loop;
    src.connect(dest);
    src.start();
  }

  // A short filtered burst of noise: the building block for impacts, cracks and rain drops.
  private burst(t: number, type: BiquadFilterType, freq: number, peak: number, decay: number, attack = 0.004) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    src.connect(f).connect(g).connect(this.radioBus()!);
    src.start(t, Math.random() * 1.5);
    src.stop(t + attack + decay + 0.05);
  }

  // Storm level 0 to 1: wind buffeting the mic, plus rain and hail on the sleigh.
  private setStorm(level: number) {
    const ctx = this.ctx;
    const bus = this.radioBus();
    if (!ctx || !bus || !this.noiseBuffer) return;
    if (!this.stormGain) {
      this.stormGain = ctx.createGain();
      this.stormGain.gain.value = 0;
      this.stormGain.connect(bus);
      if (this.samples.storm) {
        this.playSample(this.samples.storm, this.stormGain, true);
        this.stormGain.gain.setTargetAtTime(level * 0.6, ctx.currentTime, 0.7);
        return;
      }

      // Wind: low noise whose filter and loudness wander on slow, unrelated cycles, so the gusts never repeat neatly.
      const wind = ctx.createBufferSource();
      wind.buffer = this.noiseBuffer;
      wind.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 700;
      lp.Q.value = 1.5;
      const windAmp = ctx.createGain();
      windAmp.gain.value = 0.7;
      for (const [rate, depth] of [[0.13, 350], [0.41, 180], [1.7, 90]]) {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = rate;
        const d = ctx.createGain();
        d.gain.value = depth;
        lfo.connect(d).connect(lp.frequency);
        lfo.start();
      }
      for (const [rate, depth] of [[0.19, 0.3], [2.3, 0.12]]) {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = rate;
        const d = ctx.createGain();
        d.gain.value = depth;
        lfo.connect(d).connect(windAmp.gain);
        lfo.start();
      }
      wind.connect(lp).connect(windAmp).connect(this.stormGain);
      wind.start();

      // Rain and hail: a looped buffer of hiss plus hundreds of tiny drops and some harder hail ticks.
      const len = ctx.sampleRate * 3;
      const rainBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = rainBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.08;
      const drop = (amp: number, ms: number) => {
        const at = Math.floor(Math.random() * len);
        const n = Math.floor((ms / 1000) * ctx.sampleRate);
        for (let j = 0; j < n && at + j < len; j++) d[at + j] += (Math.random() * 2 - 1) * amp * Math.exp((-6 * j) / n);
      };
      for (let i = 0; i < 900; i++) drop(0.15 + Math.random() * 0.35, 4 + Math.random() * 8);
      for (let i = 0; i < 70; i++) drop(0.6 + Math.random() * 0.4, 6 + Math.random() * 10);
      const rain = ctx.createBufferSource();
      rain.buffer = rainBuf;
      rain.loop = true;
      const rhp = ctx.createBiquadFilter();
      rhp.type = "highpass";
      rhp.frequency.value = 1200;
      const rainAmp = ctx.createGain();
      rainAmp.gain.value = 0.55;
      rain.connect(rhp).connect(rainAmp).connect(this.stormGain);
      rain.start();
    }
    this.stormGain.gain.setTargetAtTime(level * 0.6, ctx.currentTime, 0.7);
  }

  // Returns roughly how long the effect lasts, in ms.
  private playSfx(sfx: "crash"): number {
    if (!this.ctx || !this.noiseBuffer || !this.radioBus()) return 0;
    const sample = this.samples[sfx];
    if (sample) {
      this.setStatic(0.5);
      this.playSample(sample, this.radioBus()!);
      return Math.min(sample.duration * 1000, 3000); // long tails keep ringing under the static
    }
    return this.crash();
  }

  // Sleigh bells: bright, slightly out-of-tune metallic pings (shaken loose in the synthesised crash).
  private bells(t0: number, count: number, spread: number, loud = 0.12): number {
    const ctx = this.ctx!;
    for (let i = 0; i < count; i++) {
      const t = t0 + (i / count) * spread + Math.random() * 0.05;
      const f = 2300 + Math.random() * 700;
      const amp = loud * (0.5 + Math.random() * 0.5);
      for (const [mult, a] of [[1, 1], [2.76, 0.5], [5.4, 0.25]]) {
        const o = ctx.createOscillator();
        o.frequency.value = f * mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(amp * a, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        o.connect(g).connect(this.radioBus()!);
        o.start(t);
        o.stop(t + 0.4);
      }
    }
    return spread * 1000 + 600;
  }

  // The crash, as Santa's radio would pick it up: the impact overloads the handset,
  // then wood splinters, the bells clatter, debris lands and the static takes over.
  private crash(): number {
    const t = this.ctx!.currentTime;
    this.setStatic(0.5);
    this.burst(t, "lowpass", 160, 2.5, 1.1, 0.008);  // body of the impact
    this.burst(t, "bandpass", 900, 1.6, 0.35);       // the hit itself
    this.burst(t + 0.02, "highpass", 2500, 1.2, 0.12); // crack
    for (let i = 0; i < 40; i++) {                    // wood splintering, thinning out
      const dt = t + 0.05 + Math.pow(Math.random(), 1.8) * 1.1;
      this.burst(dt, "bandpass", 1200 + Math.random() * 2800, 0.25 + Math.random() * 0.6, 0.02 + Math.random() * 0.04, 0.001);
    }
    this.bells(t + 0.05, 12, 0.9, 0.08);             // harness bells shaken loose
    for (const dt of [0.35, 0.6, 0.85, 1.2]) {        // debris landing
      this.burst(t + dt + Math.random() * 0.1, "lowpass", 300, 0.5 + Math.random() * 0.5, 0.25);
    }
    return 1300;
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
      if (line.storm !== undefined) this.setStorm(line.storm);
      const typing = wait(line.text.length * TYPE_MS_PER_CHAR + 650);
      await (synth ? Promise.all([typing, speak(line.text, voice, this.voiceSettings)]) : typing);
      if (this.stopped) return;
      if (line.sfx) await wait(this.playSfx(line.sfx));
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
