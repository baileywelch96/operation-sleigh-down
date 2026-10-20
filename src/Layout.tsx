import { useEffect, useRef, useState } from "react";
import { exercise } from "./content";
import { sections } from "./sections";
import { Candy } from "./components/Decorations";

type Props = { index: number; go: (to: string) => void };

export function SectionPage({ index, go }: Props) {
  const section = sections[index];
  const prev = sections[index - 1];
  const next = sections[index + 1];
  const [menuOpen, setMenuOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // New page: scroll to the top and move focus to the heading for screen readers.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
    setMenuOpen(false);
  }, [index]);

  // Left / right arrow keys move between pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" && next) go(next.id);
      if (e.key === "ArrowLeft") go(prev ? prev.id : "title");
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  const Page = section.Page;
  const n = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#/title">Operation <span>Sleigh Down</span></a>
          <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="section-menu" onClick={() => setMenuOpen((o) => !o)}>
            <span className="mono">{n(index)} / {sections.length}</span> Sections
          </button>
        </div>
        <Candy />
      </header>

      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)}>
          <nav id="section-menu" className="menu" aria-label="Sections" onClick={(e) => e.stopPropagation()}>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#/${s.id}`} aria-current={i === index ? "page" : undefined}>
                    <span className="mono">{n(i)}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <a className="menu-replay" href="#/">Replay the Mayday call</a>
          </nav>
        </div>
      )}

      <main className="wrap page" key={section.id}>
        <div className="sec-head">
          <span className="eyebrow">Section {n(index)} of {sections.length}</span>
          <h2 tabIndex={-1} ref={headingRef}>{section.title}</h2>
          {section.intro && <p>{section.intro}</p>}
        </div>
        <Page />
      </main>

      <nav className="pager wrap" aria-label="Previous and next">
        {prev ? (
          <a className="pager-btn" href={`#/${prev.id}`}>
            <small>← Previous</small>{prev.title}
          </a>
        ) : (
          <a className="pager-btn" href="#/title"><small>← Back</small>Title screen</a>
        )}
        {next ? (
          <a className="pager-btn next" href={`#/${next.id}`}>
            <small>Next →</small>{next.title}
          </a>
        ) : (
          <a className="pager-btn next" href={`#/${sections[0].id}`}>
            <small>Finished →</small>Back to the briefing
          </a>
        )}
      </nav>

      <footer><div className="wrap">{exercise.footer}</div></footer>
    </div>
  );
}
