import { scenario } from "../content";

export default function Briefing() {
  return (
    <>
      <div className="prose">
        {scenario.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <p className="twist"><strong>The twist:</strong> {scenario.twist}</p>
      </div>
      <h3>Training goals</h3>
      <ul className="goals">
        {scenario.goals.map((g) => <li key={g}>{g}</li>)}
      </ul>
    </>
  );
}
