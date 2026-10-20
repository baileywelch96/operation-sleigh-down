import { caltopoRows, caltopoTips } from "../content";
import { Table } from "../components/Table";

export default function CalTopo() {
  return (
    <>
      <Table head={["Phase", "Chances to use CalTopo"]} rows={caltopoRows} bold={[0]} />
      <div className="callout info">
        <h3>Learning as we go</h3>
        <ul>{caltopoTips.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </>
  );
}
