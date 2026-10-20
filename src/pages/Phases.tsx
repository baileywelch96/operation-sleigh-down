import { phases } from "../content";
import { Rich } from "../components/Rich";

export default function Phases() {
  return (
    <div className="phases">
      {phases.map((p) => (
        <article className="phase" key={p.num}>
          <div className="num">{p.num}</div>
          <h3>{p.title}</h3>
          <div className="meta">{p.meta}</div>
          <ul>{p.steps.map((s) => <li key={s}><Rich text={s} /></li>)}</ul>
          {p.watch && (
            <p className={p.alert ? "watch alt" : "watch"}><b>Watch for:</b> {p.watch}</p>
          )}
        </article>
      ))}
    </div>
  );
}
