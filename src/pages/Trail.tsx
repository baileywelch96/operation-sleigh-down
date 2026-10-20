import { trail, trailBackup } from "../content";

export default function Trail() {
  return (
    <>
      <ol className="trail">
        {trail.map((t, i) => (
          <li key={t.item}>
            <div className="dot">{i + 1}</div>
            <div className="what">
              <b>{t.item} {t.skill && <span className="skill">{t.skill}</span>}</b>
              <span className="where">{t.where}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="note">{trailBackup}</p>
    </>
  );
}
