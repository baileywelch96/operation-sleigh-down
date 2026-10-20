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

// A snowy treeline along the bottom of the title screen.
export function Trees() {
  const trees: [number, number][] = [[20, 70], [70, 100], [125, 60], [930, 65], [990, 105], [1050, 75], [1110, 55], [1170, 90]];
  return (
    <svg className="trees" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 120 L0 104 Q300 88 600 102 T1200 98 L1200 120Z" fill="#f3f7f4" opacity=".9" />
      {trees.map(([x, h], i) => (
        <g key={i} transform={`translate(${x} ${110 - h})`}>
          <path d={`M0 ${h} L${h * 0.3} ${h * 0.55} L${h * 0.18} ${h * 0.55} L${h * 0.38} ${h * 0.25} L${h * 0.28} ${h * 0.25} L${h * 0.45} 0 L${h * 0.62} ${h * 0.25} L${h * 0.52} ${h * 0.25} L${h * 0.72} ${h * 0.55} L${h * 0.6} ${h * 0.55} L${h * 0.9} ${h}Z`} fill={i % 2 ? "#1f6b4f" : "#2f8f5b"} />
          <path d={`M${h * 0.38} ${h * 0.12} L${h * 0.45} 0 L${h * 0.52} ${h * 0.12}Z`} fill="#f3f7f4" opacity=".85" />
        </g>
      ))}
    </svg>
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
