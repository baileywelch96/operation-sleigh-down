import { useEffect, useState } from "react";
import { voiceDefaults } from "./content";

// Voice settings for Santa's computer voice, saved in this browser only.
export type VoiceSettings = { enabled: boolean; name: string | null; pitch: number; rate: number };

const KEY = "sleighdown-voice-v1";
const MALE = /\b(male|man|william|ryan|guy|davis|andrew|brian|christopher|eric|roger|steffan|daniel|lee|james|arthur|fred|alex|thomas|george|oliver|aaron|gordon|rishi|reed|ralph|tony)\b/i;
const FEMALE = /\b(female|woman|karen|samantha|victoria|zira|susan|serena|moira|tessa|fiona|catherine|hazel|libby|sonia|natasha|aria|jenny|ava|emma|michelle|ana|clara|sara|allison|nicky|kate|martha|shelley|sandy|flo|grandma)\b/i;

export const isLikelyMale = (v: SpeechSynthesisVoice) => MALE.test(v.name) && !FEMALE.test(v.name);

// ponytail: fixed settings from content.ts; saved per-device settings are ignored while the voice picker is hidden.
export function loadVoiceSettings(): VoiceSettings {
  return { enabled: voiceDefaults.enabled, name: null, pitch: voiceDefaults.pitch, rate: voiceDefaults.rate };
}

export function saveVoiceSettings(s: VoiceSettings) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
}

export function resetVoiceSettings() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}

// The saved voice if it exists here, else the preferred list, else any English male voice.
export function chooseVoice(voices: SpeechSynthesisVoice[], savedName: string | null): SpeechSynthesisVoice | null {
  if (savedName) {
    const saved = voices.find((v) => v.name === savedName);
    if (saved) return saved;
  }
  for (const want of voiceDefaults.preferredVoices) {
    const hit = voices.find((v) => v.name === want) || voices.find((v) => v.name.toLowerCase().includes(want.toLowerCase()));
    if (hit && !FEMALE.test(hit.name)) return hit;
  }
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  return (
    en.find((v) => isLikelyMale(v) && v.lang === "en-AU") ||
    en.find((v) => isLikelyMale(v) && v.lang === "en-GB") ||
    en.find(isLikelyMale) ||
    en.find((v) => !FEMALE.test(v.name)) ||
    null
  );
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis;
  if (!synth) return Promise.resolve([]);
  const now = synth.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(synth.getVoices()), 1000);
    synth.addEventListener("voiceschanged", () => { clearTimeout(t); resolve(synth.getVoices()); }, { once: true });
  });
}

// React hook: the device's English voices, male-sounding ones first.
export function useVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    let alive = true;
    const update = (list: SpeechSynthesisVoice[]) => {
      if (!alive) return;
      const en = list.filter((v) => v.lang.toLowerCase().startsWith("en"));
      en.sort((a, b) => Number(isLikelyMale(b)) - Number(isLikelyMale(a)) || a.name.localeCompare(b.name));
      setVoices(en);
    };
    loadVoices().then(update);
    const synth = window.speechSynthesis;
    const onChange = () => update(synth.getVoices());
    synth?.addEventListener("voiceschanged", onChange);
    return () => { alive = false; synth?.removeEventListener("voiceschanged", onChange); };
  }, []);
  return voices;
}

export function speak(text: string, voice: SpeechSynthesisVoice | null, s: VoiceSettings): Promise<void> {
  const synth = window.speechSynthesis;
  const fallbackMs = 600 + text.split(" ").length * 450;
  if (!synth) return new Promise((r) => setTimeout(r, fallbackMs));
  return new Promise((resolve) => {
    let finished = false;
    const done = () => { if (!finished) { finished = true; resolve(); } };
    const u = new SpeechSynthesisUtterance(text.replace(/…/g, "..."));
    if (voice) { u.voice = voice; u.lang = voice.lang; }
    u.pitch = s.pitch;
    u.rate = s.rate;
    u.onend = done;
    u.onerror = done;
    synth.speak(u);
    setTimeout(done, fallbackMs / s.rate + 2500); // some browsers never fire onend
  });
}
