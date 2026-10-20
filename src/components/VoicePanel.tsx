import { useState } from "react";
import { chooseVoice, isLikelyMale, resetVoiceSettings, saveVoiceSettings, speak, useVoices, type VoiceSettings } from "../voice";
import { voiceDefaults } from "../content";

type Props = { settings: VoiceSettings; onChange: (s: VoiceSettings) => void; onClose: () => void };

const TEST_LINE = "Elf HQ, Elf HQ, this is Sleigh One. Ho ho... oh no.";

export function VoicePanel({ settings, onChange, onClose }: Props) {
  const voices = useVoices();
  const [testing, setTesting] = useState(false);
  const active = chooseVoice(voices, settings.name);

  const update = (patch: Partial<VoiceSettings>) => {
    const next = { ...settings, ...patch };
    onChange(next);
    saveVoiceSettings(next);
  };

  const test = async () => {
    window.speechSynthesis?.cancel();
    setTesting(true);
    await speak(TEST_LINE, active, settings);
    setTesting(false);
  };

  const reset = () => {
    resetVoiceSettings();
    onChange({ enabled: voiceDefaults.enabled, name: null, pitch: voiceDefaults.pitch, rate: voiceDefaults.rate });
  };

  return (
    <div className="voice-panel" role="group" aria-label="Santa's voice">
      <div className="vp-row">
        <label className="vp-toggle">
          <input type="checkbox" id="voice-on" checked={settings.enabled} onChange={(e) => update({ enabled: e.target.checked })} />
          Santa speaks
        </label>
        <button type="button" className="vp-close" onClick={onClose}>Done</button>
      </div>

      <label className="vp-field" htmlFor="voice-name">
        <span>Voice</span>
        <select id="voice-name" value={active?.name ?? ""} disabled={!settings.enabled || !voices.length}
          onChange={(e) => update({ name: e.target.value || null })}>
          {!voices.length && <option value="">No voices found on this device</option>}
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {isLikelyMale(v) ? "♂ " : ""}{v.name} ({v.lang})
            </option>
          ))}
        </select>
      </label>

      <div className="vp-sliders">
        <label className="vp-field" htmlFor="voice-pitch">
          <span>Pitch <b className="mono">{settings.pitch.toFixed(2)}</b></span>
          <input id="voice-pitch" type="range" min="0.1" max="1.5" step="0.05" value={settings.pitch}
            disabled={!settings.enabled} onChange={(e) => update({ pitch: Number(e.target.value) })} />
        </label>
        <label className="vp-field" htmlFor="voice-rate">
          <span>Speed <b className="mono">{settings.rate.toFixed(2)}</b></span>
          <input id="voice-rate" type="range" min="0.5" max="1.4" step="0.05" value={settings.rate}
            disabled={!settings.enabled} onChange={(e) => update({ rate: Number(e.target.value) })} />
        </label>
      </div>

      <div className="vp-row">
        <button type="button" className="skip" onClick={test} disabled={!settings.enabled || testing}>
          {testing ? "Speaking…" : "Test voice"}
        </button>
        <button type="button" className="vp-link" onClick={reset}>Reset to default</button>
      </div>
      <p className="vp-note">♂ marks voices that sound male. Saved on this device only. Best voices: Edge on Windows ("Online (Natural)"), or Daniel on Mac and iPhone.</p>
    </div>
  );
}
