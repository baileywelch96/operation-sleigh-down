import { caltopoFallback, caltopoRows } from "../content";
import { Table } from "../components/Table";

export default function CalTopo() {
  return (
    <>
      <Table head={["Phase", "How CalTopo is used"]} rows={caltopoRows} bold={[0]} />
      <div className="callout warn">
        <h3>Keep the old-school skills</h3>
        <ul>{caltopoFallback.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </>
  );
}
