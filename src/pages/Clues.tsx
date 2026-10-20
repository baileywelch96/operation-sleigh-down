import { cacheNote, maydayLines, routeIntro, teamCards } from "../content";
import { Rich } from "../components/Rich";

const ORDINAL = ["first", "second", "third"];

export default function Clues() {
  return (
    <>
      <div className="mayday-card">
        <b>MAYDAY CARD · READ BY ELF HQ</b>
        "{maydayLines.map((l) => l.text + (l.sfx === "crash" ? " [crash]" : "") + (l.staticAfter ? " [static]" : "")).join(" ")} [radio cuts out]"
      </div>
      <p className="prose">{routeIntro}</p>
      <div className="cards">
        {teamCards.map((c, i) => (
          <div className="fcard" key={c.team}>
            <div className="ftop">
              <h3>{c.team}</h3>
              <span className="swatch" style={{ background: c.colour }} />
            </div>
            <p><b>Your job:</b> find Santa's {ORDINAL[i]} word.</p>
            <ol className="route">
              <li><b>Compass.</b> From Elf HQ, walk <span className="blank">___</span>° for <span className="blank">___</span> m.</li>
              <li><b>CalTopo.</b> Enter these coordinates and navigate to them: <span className="blank wide">__________</span></li>
              <li><b>Search.</b> Use the clue to find the cache: <span className="riddle">"{c.riddle}"</span> Look for {c.find}.</li>
              <li><b>Radio.</b> Read your word to Elf HQ and wait for instructions.</li>
            </ol>
          </div>
        ))}
      </div>
      <p className="note"><Rich text={cacheNote} /></p>
    </>
  );
}
