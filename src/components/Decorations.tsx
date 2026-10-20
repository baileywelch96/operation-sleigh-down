import type { CSSProperties } from "react";

export function Lights({ count = 24 }: { count?: number }) {
  return (
    <div className="lights" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <i key={i} />)}
    </div>
  );
}

// Deterministic scatter so the snow looks the same on every load.
const flakes = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 10 + ((i * 7) % 16),
  dur: 10 + ((i * 5) % 9),
}));

export function Snow() {
  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          style={{ left: `${f.left}%`, fontSize: f.size, animationDuration: `${f.dur}s`, animationDelay: `-${(i * 1.3) % f.dur}s`, "--t": `${f.top}%` } as CSSProperties}
        >
          {i % 3 ? "•" : "❄"}
        </span>
      ))}
    </div>
  );
}

// [left %, string length px, ball colour, ball size px]
const baubles: [number, number, string, number][] = [
  [3, 40, "#d32f3f", 34], [8, 90, "#f2c14e", 26], [13, 55, "#2f8f5b", 30],
  [72, 70, "#2f8f5b", 28], [78, 35, "#f2c14e", 32], [84, 85, "#d32f3f", 26],
];

export function Baubles() {
  return (
    <div className="baubles" aria-hidden="true">
      {baubles.map(([left, len, colour, size], i) => (
        <svg key={i} className="bauble" style={{ left: `${left}%`, animationDelay: `${i * 0.5}s` }} width={size} height={len + size + 6} viewBox={`0 0 ${size} ${len + size + 6}`}>
          <line x1={size / 2} y1="0" x2={size / 2} y2={len} stroke="#f2c14e" strokeOpacity=".55" />
          <rect x={size / 2 - 4} y={len} width="8" height="6" rx="1" fill="#c9962b" />
          <circle cx={size / 2} cy={len + 6 + size / 2} r={size / 2} fill={colour} />
          <circle cx={size * 0.36} cy={len + 6 + size * 0.34} r={size * 0.12} fill="#fff" opacity=".45" />
        </svg>
      ))}
    </div>
  );
}

// A snowy treeline along the bottom of the title screen: a stretchy ground strip,
// plus a fixed-size grove in each corner so the trees never get cropped or squashed.
const leftGrove: [number, number][] = [[10, 70], [60, 100], [115, 60]];
const rightGrove: [number, number][] = [[10, 65], [70, 105], [130, 75], [190, 55], [250, 90]];

function Grove({ trees, width, className }: { trees: [number, number][]; width: number; className: string }) {
  return (
    <svg className={`grove ${className}`} viewBox={`0 0 ${width} 110`}>
      {trees.map(([x, h], i) => (
        <g key={i} transform={`translate(${x} ${110 - h})`}>
          <path d={`M0 ${h} L${h * 0.3} ${h * 0.55} L${h * 0.18} ${h * 0.55} L${h * 0.38} ${h * 0.25} L${h * 0.28} ${h * 0.25} L${h * 0.45} 0 L${h * 0.62} ${h * 0.25} L${h * 0.52} ${h * 0.25} L${h * 0.72} ${h * 0.55} L${h * 0.6} ${h * 0.55} L${h * 0.9} ${h}Z`} fill={i % 2 ? "#1f6b4f" : "#2f8f5b"} />
          <path d={`M${h * 0.38} ${h * 0.12} L${h * 0.45} 0 L${h * 0.52} ${h * 0.12}Z`} fill="#f3f7f4" opacity=".85" />
        </g>
      ))}
    </svg>
  );
}

export function Trees() {
  return (
    <div className="trees" aria-hidden="true">
      <Grove trees={leftGrove} width={180} className="left" />
      <Grove trees={rightGrove} width={340} className="right" />
      <svg className="ground" viewBox="0 86 1200 34" preserveAspectRatio="none">
        <path d="M0 120 L0 104 Q300 88 600 102 T1200 98 L1200 120Z" fill="#f3f7f4" opacity=".9" />
      </svg>
    </div>
  );
}

export function Holly({ className = "holly" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 90" aria-hidden="true">
      <path d="M58 52 C40 40 22 44 6 30 C14 32 18 26 16 20 C24 26 30 22 32 16 C36 26 44 24 48 22 C46 32 54 40 58 52Z" fill="#2f8f5b" />
      <path d="M62 52 C80 40 98 44 114 30 C106 32 102 26 104 20 C96 26 90 22 88 16 C84 26 76 24 72 22 C74 32 66 40 62 52Z" fill="#247a4b" />
      <path d="M58 52 L48 22 M62 52 L72 22" stroke="#174f32" strokeWidth="1.5" fill="none" />
      <circle cx="54" cy="56" r="8" fill="#d32f3f" />
      <circle cx="68" cy="57" r="8" fill="#b81f30" />
      <circle cx="61" cy="68" r="8" fill="#e04452" />
      <circle cx="51" cy="53" r="2.2" fill="#fff" opacity=".6" />
      <circle cx="65" cy="54" r="2.2" fill="#fff" opacity=".6" />
      <circle cx="58" cy="65" r="2.2" fill="#fff" opacity=".6" />
    </svg>
  );
}

export function Candy() {
  return <div className="candy" aria-hidden="true" />;
}

// ---------- Title screen scene ----------

function Reindeer({ x, flip = 0 }: { x: number; flip?: number }) {
  // A simple flying reindeer, facing right, about 54 x 40.
  return (
    <g transform={`translate(${x} ${flip})`}><g className="deer">
      <path d="M8 20 L2 32 M14 22 L12 34 M34 22 L40 32 M40 20 L46 30" stroke="#7a4b2a" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="24" cy="18" rx="20" ry="9" fill="#8b5a33" />
      <ellipse cx="22" cy="21" rx="13" ry="4" fill="#c9a27a" opacity=".55" />
      <path d="M40 14 L48 6" stroke="#8b5a33" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="51" cy="6" rx="6" ry="4.5" fill="#8b5a33" />
      <circle cx="56" cy="7" r="1.8" fill="#2b1a0e" />
      <circle cx="51" cy="4" r="1" fill="#1a1a1a" />
      <path d="M48 2 L45 -6 M46.5 -2 L42 -4 M52 1 L54 -7 M53 -3 L57 -5" stroke="#d9c39a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M2 16 L-3 13" stroke="#8b5a33" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="12" width="28" height="3" rx="1.5" fill="#c62838" />
      <circle cx="24" cy="16" r="2" fill="#f2c14e" />
    </g></g>
  );
}

export function FlyingSleigh() {
  return (
    <div className="flyer" aria-hidden="true">
      <svg viewBox="-8 -12 330 92" className="flyer-svg">
        {/* reins */}
        <path d="M98 1 Q150 4 196 26 Q230 20 262 18" stroke="#f2c14e" strokeWidth="1.2" fill="none" opacity=".7" />
        <Reindeer x={190} />
        <Reindeer x={255} flip={-6} />
        {/* sleigh */}
        <path d="M14 30 L104 30 Q118 30 118 44 L118 52 Q118 60 108 60 L30 60 Q14 60 12 46Z" fill="#c62838" />
        <path d="M14 30 L104 30 L102 36 L18 36Z" fill="#a3172b" />
        <path d="M30 48 Q50 40 70 48 Q90 56 108 46" stroke="#f2c14e" strokeWidth="2" fill="none" />
        <path d="M6 68 L116 68 Q128 68 128 58" stroke="#f2c14e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M34 60 L30 68 M96 60 L100 68" stroke="#f2c14e" strokeWidth="3" />
        {/* sack of presents */}
        <path d="M16 30 Q10 6 30 4 Q44 6 42 30Z" fill="#7a4b2a" />
        <rect x="24" y="-2" width="12" height="10" fill="#2f8f5b" />
        <rect x="29" y="-2" width="2.5" height="10" fill="#f2c14e" />
        {/* Santa */}
        <path d="M58 30 Q56 10 72 8 Q88 10 86 30Z" fill="#d32f3f" />
        <rect x="58" y="22" width="28" height="4" fill="#2b1a0e" />
        <rect x="69" y="21" width="6" height="6" rx="1" fill="#f2c14e" />
        <circle cx="74" cy="0" r="8" fill="#f1c8a5" />
        <path d="M66 2 Q74 16 82 2 Q78 8 74 8 Q70 8 66 2Z" fill="#f4f7f5" />
        <path d="M65 -2 Q74 -18 86 -10 L80 -4Z" fill="#d32f3f" />
        <circle cx="87" cy="-10" r="3" fill="#f4f7f5" />
        <rect x="64" y="-4" width="20" height="4" rx="2" fill="#f4f7f5" />
        <circle cx="77" cy="-1" r="1" fill="#2b1a0e" />
        {/* arm raised, holding the reins */}
        <path d="M83 15 L91 7" stroke="#d32f3f" strokeWidth="6" strokeLinecap="round" />
        <rect x="88" y="3" width="7" height="4" rx="1.5" transform="rotate(-45 91.5 5)" fill="#f4f7f5" />
        <rect x="91" y="-2" width="8" height="7" rx="3.5" fill="#2b1a0e" />
      </svg>
    </div>
  );
}

function Elf({ hat, wave = false }: { hat: string; wave?: boolean }) {
  return (
    <svg viewBox="0 0 60 80" className={`elf${wave ? " waving" : ""}`}>
      <path d="M14 48 Q30 40 46 48 L50 80 L10 80Z" fill={hat} />
      <rect x="12" y="58" width="36" height="4" fill="#2b1a0e" />
      <rect x="27" y="57" width="6" height="6" fill="#f2c14e" />
      <path d="M12 52 L4 44" stroke={hat} strokeWidth="6" strokeLinecap="round" />
      <g className="elf-arm">
        <path d="M48 52 L56 40" stroke={hat} strokeWidth="6" strokeLinecap="round" />
        <circle cx="57" cy="38" r="3.5" fill="#f1c8a5" />
      </g>
      <path d="M13 32 L4 26 L15 38Z M47 32 L56 26 L45 38Z" fill="#e8b48f" />
      <circle cx="30" cy="34" r="15" fill="#f1c8a5" />
      <circle cx="24" cy="33" r="1.8" fill="#2b1a0e" />
      <circle cx="36" cy="33" r="1.8" fill="#2b1a0e" />
      <circle cx="21" cy="39" r="2.6" fill="#f2a1a1" opacity=".7" />
      <circle cx="39" cy="39" r="2.6" fill="#f2a1a1" opacity=".7" />
      <path d="M25 41 Q30 45 35 41" stroke="#2b1a0e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M14 24 Q30 -10 52 6 Q40 6 46 22Z" fill={hat} />
      <rect x="13" y="20" width="34" height="6" rx="3" fill="#f4f7f5" />
      <circle cx="53" cy="6" r="4" fill="#f2c14e" />
    </svg>
  );
}

const presents: [number, number, number, string, string][] = [
  // [left px from the grove edge, width, height, box colour, ribbon colour]
  [0, 34, 28, "#d32f3f", "#f2c14e"],
  [30, 26, 36, "#f2c14e", "#2f8f5b"],
  [52, 30, 22, "#3f7fbf", "#f4f7f5"],
];

function Presents() {
  return (
    <svg viewBox="0 -4 86 40" className="presents">
      {presents.map(([x, w, h, box, ribbon], i) => (
        <g key={i} transform={`translate(${x} ${36 - h})`}>
          <rect width={w} height={h} rx="2" fill={box} />
          <rect x={w / 2 - 2.5} width="5" height={h} fill={ribbon} />
          <rect y={h * 0.35} width={w} height="4" fill={ribbon} />
          <path d={`M${w / 2} 0 Q${w / 2 - 9} -8 ${w / 2 - 6} 0 M${w / 2} 0 Q${w / 2 + 9} -8 ${w / 2 + 6} 0`} stroke={ribbon} strokeWidth="2.5" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function Workshop() {
  return (
    <div className="workshop" aria-hidden="true">
      <div className="elves left"><Elf hat="#2f8f5b" wave /><Presents /></div>
      <div className="elves right"><Presents /><Elf hat="#c62838" /></div>
    </div>
  );
}

// Giant green boot prints that tiptoe across the snow. Someone was here...
const STEPS = 9;
export function SneakyPrints() {
  return (
    <div className="prints" aria-hidden="true">
      {Array.from({ length: STEPS }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 40"
          className="print"
          style={{ left: `${24 + i * 4.8}%`, bottom: i % 2 ? 34 : 18, animationDelay: `${i * 0.55}s` }}
        >
          <ellipse cx="12" cy="13" rx="10" ry="12" />
          <ellipse cx="12" cy="33" rx="7" ry="6" />
          <circle cx="4" cy="2" r="2.6" /><circle cx="10" cy="-0.5" r="2.6" /><circle cx="16" cy="0" r="2.6" /><circle cx="21" cy="3" r="2.4" />
        </svg>
      ))}
      <span className="prints-note">Who left these?</span>
    </div>
  );
}
