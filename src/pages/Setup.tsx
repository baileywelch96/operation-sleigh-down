import { setupDay, setupRecce } from "../content";
import { Checklist } from "../components/Checklist";

export default function Setup() {
  return (
    <div className="cols">
      <div><h3>Recce day · a week before</h3><Checklist items={setupRecce} prefix="r" /></div>
      <div><h3>On the day · 1 hr before</h3><Checklist items={setupDay} prefix="d" /></div>
    </div>
  );
}
