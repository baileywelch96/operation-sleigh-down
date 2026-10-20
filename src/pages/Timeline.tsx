import { sessionMinutes, timelineBars, timelineRows, type Lane } from "../content";
import { Table } from "../components/Table";

const lanes: { lane: Lane[]; label: string }[] = [
  { lane: ["all", "buffer"], label: "All teams" },
  { lane: ["triage"], label: "2 teams" },
  { lane: ["search"], label: "1 team" },
];
const ticks = [0, 30, 60, 90, 120, 140];
const pct = (m: number) => `${(m / sessionMinutes) * 100}%`;
const fmt = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

export default function Timeline() {
  return (
    <>
      <div className="lanes" role="img" aria-label={`Session timeline from 0 to ${sessionMinutes} minutes`}>
        <div className="lanes-inner">
          {lanes.map((l) => (
            <div className="lane" key={l.label}>
              <div className="lane-label">{l.label}</div>
              <div className="track">
                {timelineBars.filter((b) => l.lane.includes(b.lane)).map((b) => (
                  <div key={b.label + b.start} className={`bar b-${b.lane}`} style={{ left: pct(b.start), width: pct(b.end - b.start) }}>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="scale">
            <div />
            <div className="ticks">
              {ticks.map((t) => <span key={t} style={{ left: pct(t) }}>{fmt(t)}</span>)}
            </div>
          </div>
        </div>
      </div>
      <Table head={["Time", "Phase", "Skills"]} rows={timelineRows} mono={[0]} />
    </>
  );
}
