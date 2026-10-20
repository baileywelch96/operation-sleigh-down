import { useEffect, useRef, useState } from "react";
import { exercise, maydayLines } from "./content";
import { MaydayPlayer, type RadioMode } from "./radio";
import { Baubles, Candy, FlyingSleigh, Holly, Lights, SneakyPrints, Snow, Trees, Workshop } from "./components/Decorations";
import { loadVoiceSettings, type VoiceSettings } from "./voice";

type Stage = "ready" | "playing" | "fading" | "title";
type Props = { startAt: "radio" | "title"; onBegin: () => void };

const BAR_COUNT = 32;

export function Intro({ startAt, onBegin }: Props) {
  const [stage, setStage] = useState<Stage>(startAt === "title" ? "title" : "ready");
  const [lineIndex, setLineIndex] = useState(-1);
  const [mode, setMode] = useState<RadioMode>("idle");
  const [typed, setTyped] = useState("");
  const [voice] = useState<VoiceSettings>(loadVoiceSettings);
  const player = useRef<MaydayPlayer | null>(null);
  const transcript = useRef<HTMLDivElement>(null);

  // Fixed-height transcript: keep the newest line in view as it types.
  useEffect(() => {
    const el = transcript.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed, lineIndex]);

  // Stop the audio if the page changes mid-call.
  useEffect(() => () => player.current?.stop(), []);

  // Typewriter effect for the line currently being spoken.
  useEffect(() => {
    if (lineIndex < 0) return;
    const full = maydayLines[lineIndex].text;
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 38);
    return () => clearInterval(t);
  }, [lineIndex]);

  const toTitle = () => {
    player.current?.stop();
    setStage("fading");
    setTimeout(() => setStage("title"), 1100);
  };

  const replay = () => {
    setLineIndex(-1);
    setMode("idle");
    setStage("ready");
  };

  const receive = () => {
    window.speechSynthesis?.cancel();
    setStage("playing");
    setLineIndex(-1);
    const p = new MaydayPlayer(maydayLines, {
      onLine: setLineIndex,
      onMode: setMode,
      onDone: toTitle,
    }, voice);
    player.current = p;
    void p.start();
  };

  if (stage === "title") {
    return (
      <div className="title-screen">
        <Lights count={28} />
        <Snow />
        <Baubles />
        <Holly className="holly big" />
        <FlyingSleigh />
        <Trees />
        <Workshop />
        <SneakyPrints />
        <div className="wrap title-inner">
          <div className="eyebrow">{exercise.eyebrow}</div>
          <h1>Operation <span>Sleigh Down</span></h1>
          <p className="subtitle">{exercise.subtitle}</p>
          <p className="lead">{exercise.lead}</p>
          <div className="facts">{exercise.facts.map((f) => <span className="fact" key={f}>{f}</span>)}</div>
          <div className="title-actions">
            <button className="begin" type="button" onClick={onBegin} autoFocus>Begin briefing →</button>
            <button className="ghost" type="button" onClick={replay}>Replay the Mayday call</button>
          </div>
        </div>
        <Candy />
      </div>
    );
  }

  const live = stage === "playing";
  return (
    <div className={`radio-screen${stage === "fading" ? " fading" : ""}`}>
      <div className={`radio ${live ? mode : "standby"}`}>
        <div className="radio-top">
          <span className="led" aria-hidden="true" />
          <span className="mono">CH 1 · ELF HQ</span>
          <span className="bars" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="mono rx">{live ? (mode === "static" ? "SIGNAL LOST" : "RX") : "STANDBY"}</span>
        </div>

        <div className={`wave ${live ? mode : "idle"}`} aria-hidden="true">
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <i key={i} style={{ animationDelay: `${(i * 97) % 600}ms` }} />
          ))}
        </div>

        <div className="transcript" ref={transcript} aria-live="polite">
          {stage === "ready" ? (
            <p className="incoming">Incoming transmission from <b>Sleigh One</b></p>
          ) : (
            maydayLines.slice(0, lineIndex + 1).map((l, i) => (
              <p key={i} className={i === lineIndex ? "current" : "past"}>
                {i === lineIndex ? typed : l.text}
                {(i < lineIndex || mode === "static") && l.sfx === "crash" ? <span className="static-tag"> [crash]</span> : null}
                {(i < lineIndex || mode === "static") && l.staticAfter ? <span className="static-tag"> [static]</span> : null}
              </p>
            ))
          )}
        </div>

        <div className="radio-actions">
          {stage === "ready" ? (
            <button className="receive" type="button" onClick={receive} autoFocus>Receive transmission</button>
          ) : (
            <span className="mono hint">{mode === "static" ? "…" : "Receiving…"}</span>
          )}
        </div>
      </div>
      <p className="radio-note">Turn your sound on</p>
    </div>
  );
}
