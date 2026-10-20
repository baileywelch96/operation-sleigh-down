import { scenario } from "../content";
import { Rich } from "../components/Rich";
import { Table } from "../components/Table";

export default function Briefing() {
  return (
    <>
      <div className="prose">
        {scenario.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <p className="twist"><strong>The twist:</strong> {scenario.twist}</p>
        <p className="twist grinch"><strong>The Grinch:</strong> {scenario.grinch}</p>
      </div>

      <h3>Aim</h3>
      <p className="prose">{scenario.aim}</p>

      <h3>At a glance</h3>
      <Table head={["Exercise", "Detail"]} rows={scenario.glance} bold={[0]} />

      <h3>How it runs</h3>
      <div className="roles stages">
        {scenario.stages.map((s) => (
          <div className="role" key={s.name}>
            <span className="tag">{s.tag}</span>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <h3>Training goals</h3>
      <ul className="goals">
        {scenario.goals.map((g) => <li key={g}>{g}</li>)}
      </ul>

      <div className="cols">
        <div>
          <h3>Ground rules for members</h3>
          <ul className="goals">{scenario.groundRules.map((r) => <li key={r}><span><Rich text={r} /></span></li>)}</ul>
        </div>
        <div>
          <h3>What members bring</h3>
          <ul className="goals">{scenario.bring.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </div>
    </>
  );
}
