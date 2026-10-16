/**
 * The two chart exhibits in the built set, as dependency-free SVG (scales to any width, prints, no JS).
 *   LineChart: C02, three series at the hard limit, the area between the first two shaded as the spread.
 *   BarChart:  C05 Exhibit B, horizontal bars bucketed by due period.
 */

const C = { a: "var(--ink)", b: "var(--accent)", c: "var(--muted-2)", grid: "var(--border)", text: "var(--muted)" };

type Series = { name: string; values: (number | null)[]; color: keyof typeof C; dashed?: boolean };

export function LineChart({ labels, series, unit, shadeBetween }: {
  labels: string[];
  series: Series[];
  unit: string;
  /** Indexes of the two series whose gap is shaded. */
  shadeBetween?: [number, number];
}) {
  const W = 640, H = 260, L = 44, R = 12, T = 12, B = 28;
  const all = series.flatMap((s) => s.values).filter((v): v is number => v !== null);
  const pad = (Math.max(...all) - Math.min(...all)) * 0.1 || 1;
  const lo = Math.floor(Math.min(...all) - pad), hi = Math.ceil(Math.max(...all) + pad);
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(labels.length - 1, 1);
  const y = (v: number) => T + ((hi - v) * (H - T - B)) / (hi - lo);
  const ticks = Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * i) / 4);
  const path = (vals: (number | null)[]) =>
    vals.map((v, i) => (v === null ? "" : `${i && vals[i - 1] !== null ? "L" : "M"}${x(i)},${y(v)}`)).join("");

  let shade = "";
  if (shadeBetween) {
    const [a, b] = shadeBetween.map((i) => series[i].values);
    const idx = labels.map((_, i) => i).filter((i) => a[i] !== null && b[i] !== null);
    shade = idx.map((i, k) => `${k ? "L" : "M"}${x(i)},${y(a[i]!)}`).join("") +
      [...idx].reverse().map((i) => `L${x(i)},${y(b[i]!)}`).join("") + "Z";
  }

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={series.map((s) => s.name).join(", ")}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={C.grid} />
            <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize={11} fill={C.text}>{Math.round(t)}</text>
          </g>
        ))}
        {shade && <path d={shade} fill="var(--accent)" opacity={0.1} />}
        {series.map((s) => (
          <g key={s.name}>
            <path d={path(s.values)} fill="none" stroke={C[s.color]} strokeWidth={2.2} strokeDasharray={s.dashed ? "6 4" : undefined} />
            {s.values.map((v, i) => v !== null && <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={C[s.color]} />)}
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize={11} fill={C.text}>{l}</text>
        ))}
        <text x={12} y={T + (H - T - B) / 2} fontSize={11} fill={C.text} transform={`rotate(-90 12 ${T + (H - T - B) / 2})`} textAnchor="middle">{unit}</text>
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        {series.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <svg width="18" height="6" aria-hidden><line x1="0" x2="18" y1="3" y2="3" stroke={C[s.color]} strokeWidth="2.5" strokeDasharray={s.dashed ? "4 3" : undefined} /></svg>
            {s.name}
          </span>
        ))}
        {shadeBetween && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm bg-accent/15" aria-hidden /> the spread
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function BarChart({ bars, unit }: { bars: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  const shades = ["var(--ink)", "var(--ink-2)", "var(--muted)", "var(--muted-2)"];
  return (
    <figure>
      <div className="space-y-2" role="img" aria-label={bars.map((b) => `${b.label}: ${b.value}`).join(", ")}>
        {bars.map((b, i) => (
          <div key={b.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 text-sm">
            <span className="text-right text-muted">{b.label}</span>
            <span className="flex items-center gap-2">
              <span className="h-6 rounded-sm" style={{ width: `${(b.value / max) * 85}%`, background: shades[i % shades.length] }} />
              <span className="tnum text-xs text-muted">{b.value}</span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 pl-[7.25rem] text-xs text-muted">{unit}</figcaption>
    </figure>
  );
}
