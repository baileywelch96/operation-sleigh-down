import { useTicks } from "../useTicks";

export function Checklist({ items, prefix }: { items: string[]; prefix: string }) {
  const { ticks, toggle } = useTicks();
  return (
    <ul className="checklist">
      {items.map((text, i) => {
        const id = `${prefix}${i}`;
        return (
          <li key={id} className={ticks[id] ? "done" : undefined}>
            <input type="checkbox" id={id} checked={!!ticks[id]} onChange={() => toggle(id)} />
            <label htmlFor={id}>{text}</label>
          </li>
        );
      })}
    </ul>
  );
}
