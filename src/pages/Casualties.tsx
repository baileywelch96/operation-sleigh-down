import { casualties, casualtyNote } from "../content";

export default function Casualties() {
  return (
    <>
      <div className="cas">
        {casualties.map((c) => (
          <div className={`ccard ${c.triage}`} key={c.name}>
            <div className="band">{c.name} <span>{c.label}</span></div>
            <dl>
              <dt>Where</dt><dd>{c.where}</dd>
              <dt>Injury</dt><dd>{c.injury}</dd>
              <dt>Acts</dt><dd>{c.acts}</dd>
              <dt>Needs</dt><dd>{c.needs}</dd>
            </dl>
          </div>
        ))}
      </div>
      <p className="note">Triage colours: red = immediate, yellow = urgent, green = walking wounded. {casualtyNote}</p>
    </>
  );
}
