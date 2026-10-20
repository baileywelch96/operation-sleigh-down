import { intelCaches, otherUnits, scalingRows, sectorsText } from "../content";
import { Table } from "../components/Table";

export default function Scaling() {
  return (
    <>
      <Table head={["Teams", "Find the Words", "At the scene", "Extra help"]} rows={scalingRows} mono={[0]} />
      <h3>Intel caches for teams 4–6</h3>
      <p className="prose">These teams aren't extras. HQ can't safely send anyone in until all intel is back.</p>
      <Table head={["Team", "Cache card says"]} rows={intelCaches} bold={[0]} />
      <h3>Search sectors with 2 search teams</h3>
      <p className="prose">{sectorsText}</p>
      <h3>Members from other units</h3>
      <ul className="goals">{otherUnits.map((u) => <li key={u}>{u}</li>)}</ul>
    </>
  );
}
