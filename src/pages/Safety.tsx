import { safetyRules } from "../content";
import { Rich } from "../components/Rich";

export default function Safety() {
  return (
    <div className="callout warn">
      <h3>Non-negotiables</h3>
      <ul>{safetyRules.map((r) => <li key={r}><Rich text={r} /></li>)}</ul>
    </div>
  );
}
