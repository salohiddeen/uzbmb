// Original saytdagi hero naqshi: 88px li plitkalar to'ri (3 ustun). O'lchamlar va shaffoflik
// original skrinshotdan o'lchab olingan. O'ng chekka ekrandan tashqarida qirqiladi.
const T = 88;
const K = 1.137; // original 100% masshtabda 13.7% kattaroq

/** Kvadrat plitka, ichida doira "teshiklar" bilan (evenodd). */
function tilePath(x: number, y: number, holes: { cx: number; cy: number; r: number }[] = []) {
  let d = `M${x} ${y}h${T}v${T}h${-T}z`;
  for (const h of holes) {
    d += `M${x + h.cx - h.r} ${y + h.cy}a${h.r} ${h.r} 0 1 0 ${2 * h.r} 0a${h.r} ${h.r} 0 1 0 ${-2 * h.r} 0z`;
  }
  return d;
}

export function HeroPattern() {
  // Qator boshlari: row0 = 0, row1 = 88, row2 = 176. Ustunlar: 0, 88, 176.
  const dots = Array.from({ length: 16 }, (_, n) => {
    const i = n % 4, j = Math.floor(n / 4);
    return { cx: 16 + i * 17.9, cy: 16.7 + j * 17.9, r: 6.3, mid: (i + j) % 2 === 0 };
  });
  return (
    <svg className="hero-pattern" width={3 * T * K} height={4 * T * K} viewBox={`0 0 ${3 * T} ${4 * T}`} aria-hidden="true">
      <defs>
        <clipPath id="c3r0"><rect x={2 * T} y={0} width={T} height={T} /></clipPath>
        <clipPath id="c3r2"><rect x={2 * T} y={2 * T} width={T} height={T} /></clipPath>
      </defs>

      {/* row0 / col3 — och plitka + doira */}
      <rect x={2 * T} y={0} width={T} height={T} fill="#8fe3d3" fillOpacity=".13" />
      <circle cx={2 * T + 30} cy={2} r={34} fill="#d2eae5" fillOpacity=".2" clipPath="url(#c3r0)" />

      {/* row1 / col2 — to'rtta doira + ikkita vertikal chiziq */}
      <rect x={T} y={T} width={T} height={T} fill="#8fe3d3" fillOpacity=".06" />
      <g transform={`translate(${T} ${T})`} fill="#d2eae5" fillOpacity=".23" stroke="#d2eae5" strokeOpacity=".23">
        <circle cx="22.7" cy="27.3" r="15" stroke="none" />
        <circle cx="22.7" cy="59.3" r="14" fill="none" strokeWidth="1.8" />
        <circle cx="60.7" cy="27.3" r="14" fill="none" strokeWidth="1.8" />
        <circle cx="60.7" cy="59.3" r="15" stroke="none" />
        <path d="M40.7 12.7v60.6M79.7 12.7v60.6" fill="none" strokeWidth="2" />
      </g>

      {/* row1 / col3 — katta qoramtir doira */}
      <rect x={2 * T} y={T} width={T} height={T} fill="#8fe3d3" fillOpacity=".13" />
      <circle cx={2 * T + 48} cy={T + 44} r={45} fill="#0b6a5b" fillOpacity=".55" />

      {/* row2 / col1 — 4x4 nuqtalar (shaxmat tartibida) */}
      <path d={tilePath(0, 2 * T, dots)} fill="#d2eae5" fillOpacity=".2" fillRule="evenodd" />
      <g transform={`translate(0 ${2 * T})`}>
        {dots.map((d, k) => (
          <circle key={k} cx={d.cx} cy={d.cy} r={d.r} fill={d.mid ? "#1c7064" : "#0e6155"} fillOpacity={d.mid ? 0.6 : 0.55} />
        ))}
      </g>

      {/* row2 / col2 — halqa + ichki och doira */}
      <rect x={T} y={2 * T} width={T} height={T} fill="#8fe3d3" fillOpacity=".12" />
      <circle cx={T + 44} cy={2 * T + 44} r={38.5} fill="none" stroke="#0b6a5b" strokeOpacity=".6" strokeWidth="9" />
      <circle cx={T + 44} cy={2 * T + 44} r={34} fill="#d2eae5" fillOpacity=".24" />

      {/* row2 / col3 — och plitka, ingichka halqa, qoramtir doira */}
      <rect x={2 * T} y={2 * T} width={T} height={T} fill="#d2eae5" fillOpacity=".23" />
      <g clipPath="url(#c3r2)">
        <circle cx={2 * T + 42} cy={2 * T + 22} r={20} fill="none" stroke="#8fe3d3" strokeOpacity=".35" strokeWidth="2.5" />
        <circle cx={2 * T + 42} cy={2 * T + 65} r={22} fill="#0b6a5b" fillOpacity=".6" />
      </g>
    </svg>
  );
}
