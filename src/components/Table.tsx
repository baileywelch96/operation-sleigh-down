import { Rich } from "./Rich";

type Props = {
  head: string[];
  rows: string[][];
  /** column indexes shown in the monospace "time" style */
  mono?: number[];
  /** column indexes shown bold */
  bold?: number[];
};

export function Table({ head, rows, mono = [], bold = [] }: Props) {
  return (
    <div className="tbl">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className={mono.includes(ci) ? "time" : undefined}>
                  {bold.includes(ci) ? <b><Rich text={c} /></b> : <Rich text={c} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
