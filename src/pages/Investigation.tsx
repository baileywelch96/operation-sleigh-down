import { evidence, evidenceLogColumns, evidenceSteps, scenario, stormOMatic } from "../content";
import { Rich } from "../components/Rich";
import { Table } from "../components/Table";

export default function Investigation() {
  return (
    <>
      <p className="twist"><strong>The rule:</strong> {scenario.grinch}</p>

      <h3>Every find, every time</h3>
      <ol className="evidence-steps">
        {evidenceSteps.map(([step, what], i) => (
          <li key={step}>
            <span className="es-num">{i + 1}</span>
            <div><b>{step}</b><span>{what}</span></div>
          </li>
        ))}
      </ol>

      <h3>The evidence</h3>
      <Table head={["Marker", "Item", "Where it's placed", "Why it matters"]} rows={evidence.map((e) => [e.id, e.item, e.where, e.tells])} mono={[0]} bold={[1]} />

      <div className="callout warn">
        <h3>The Storm-O-Matic</h3>
        <p><Rich text={stormOMatic} /></p>
      </div>

      <h3>Evidence log</h3>
      <p className="prose">Each investigation team's scribe keeps this log on their notepad. It goes to Elf HQ at the handover, along with the photos.</p>
      <Table head={evidenceLogColumns} rows={[["E1", "", "", "", "", ""], ["E2", "", "", "", "", ""], ["E3", "", "", "", "", ""]]} mono={[0]} />
    </>
  );
}
