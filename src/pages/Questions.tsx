import { questions } from "../content";
import { Checklist } from "../components/Checklist";

export default function Questions() {
  return <Checklist items={questions} prefix="q" />;
}
