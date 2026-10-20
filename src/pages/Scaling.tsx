import { evidenceAreasText, grinchCaches, scalingRows, teamForming } from "../content";
import { Table } from "../components/Table";

export default function Scaling() {
  return (
    <>
      <Table head={["Teams", "Find the Words", "At the scene", "Extra help"]} rows={scalingRows} mono={[0]} />
      <h3>Grinch clue caches for teams 4 and up</h3>
      <p className="prose">These teams aren't extras. Their caches are the first sign the storm wasn't natural, and they lead into the investigation.</p>
      <Table head={["Team", "Cache holds"]} rows={grinchCaches} bold={[0]} />
      <h3>Evidence areas</h3>
      <p className="prose">{evidenceAreasText}</p>
      <h3>Forming teams</h3>
      <ul className="goals">{teamForming.map((u) => <li key={u}>{u}</li>)}</ul>
    </>
  );
}
