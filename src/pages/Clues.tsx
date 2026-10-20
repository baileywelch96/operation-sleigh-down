import { cacheNote, maydayLines, teamCards } from "../content";
import { Rich } from "../components/Rich";

export default function Clues() {
  return (
    <>
      <div className="mayday-card">
        <b>MAYDAY CARD · READ BY ELF HQ</b>
        "{maydayLines.map((l) => l.text + (l.staticAfter ? " [static]" : "")).join(" ")} [radio cuts out]"
      </div>
      <div className="cards">
        {teamCards.map((c) => (
          <div className="fcard" key={c.team}>
            <div className="ftop">
              <h3>{c.team}</h3>
              <span className="swatch" style={{ background: c.colour }} />
            </div>
            <p className="riddle">"{c.riddle}"</p>
            <div className="legs">
              <span>Leg 1: <span className="blank">___</span>° for <span className="blank">___</span> m</span>
              <span>Leg 2: plot <span className="blank">__________</span> in CalTopo</span>
            </div>
            <p className="note">Find: {c.find}</p>
          </div>
        ))}
      </div>
      <p className="note"><Rich text={cacheNote} /></p>
    </>
  );
}
