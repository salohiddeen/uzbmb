import type { Lang } from "@/i18n";

/** Kichik SVG bayroqlar (24x16). */
export function Flag({ lang }: { lang: Lang }) {
  const common = { width: 22, height: 15, viewBox: "0 0 24 16", "aria-hidden": true as const, className: "flag" };
  if (lang === "RU") {
    return (
      <svg {...common}>
        <rect width="24" height="16" fill="#fff" />
        <rect y="5.33" width="24" height="5.34" fill="#0039a6" />
        <rect y="10.67" width="24" height="5.33" fill="#d52b1e" />
      </svg>
    );
  }
  const mid = lang === "UZ" ? "#fff" : "#f7c600";
  const top = lang === "UZ" ? "#0099b5" : "#1c8fd0";
  return (
    <svg {...common}>
      <rect width="24" height="16" fill={top} />
      <rect y="5.2" width="24" height="5.6" fill={mid} />
      <rect y="4.8" width="24" height=".8" fill="#ce1126" />
      <rect y="10.4" width="24" height=".8" fill="#ce1126" />
      <rect y="11.2" width="24" height="4.8" fill="#1eb53a" />
      {lang === "UZ" && (
        <>
          <circle cx="4.6" cy="2.6" r="1.9" fill="#fff" />
          <circle cx="5.3" cy="2.6" r="1.6" fill={top} />
          {[[8, 1.2], [10.2, 1.2], [12.4, 1.2], [8, 2.8], [10.2, 2.8], [12.4, 2.8], [10.2, 4.1]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r=".42" fill="#fff" />
          ))}
        </>
      )}
    </svg>
  );
}
