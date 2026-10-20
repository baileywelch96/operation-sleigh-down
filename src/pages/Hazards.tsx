import { hazards } from "../content";
import { Table } from "../components/Table";

export default function Hazards() {
  return <Table head={["Hazard", "Where", "Prop", "Correct response"]} rows={hazards} bold={[0]} />;
}
