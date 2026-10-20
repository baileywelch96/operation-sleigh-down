import { materials } from "../content";
import { useTicks } from "../useTicks";

export default function Materials() {
  const { ticks, toggle, clear } = useTicks();
  const total = materials.reduce((n, g) => n + g.items.length, 0);
  const done = materials.reduce((n, g, gi) => n + g.items.filter((_, ii) => ticks[`m${gi}-${ii}`]).length, 0);
  return (
    <>
      <div className="mat-tools">
        <span className="progress">{done} of {total} sourced</span>
        <button className="btn" type="button" onClick={() => clear("m")}>Clear ticks</button>
      </div>
      <div className="mat-list">
        {materials.map((g, gi) => (
          <div className="mat-group" key={g.group}>
            <h3>{g.group} <i>{g.items.length} items</i></h3>
            <div className="tbl">
              <table>
                <thead><tr><th /><th>Item</th><th>Qty</th><th>Notes</th></tr></thead>
                <tbody>
                  {g.items.map(([item, qty, note], ii) => {
                    const id = `m${gi}-${ii}`;
                    return (
                      <tr key={id} className={ticks[id] ? "done" : undefined}>
                        <td className="chk"><input type="checkbox" id={id} aria-label={item} checked={!!ticks[id]} onChange={() => toggle(id)} /></td>
                        <td>{item}</td>
                        <td className="qty">{qty}</td>
                        <td>{note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
