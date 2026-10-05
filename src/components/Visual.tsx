import type { Visual as V } from "@/content/types";
import { Ph } from "./Ph";

/** The ONE table or chart per landing page (kickoff v3 §3.4). */
export function Visual({ visual }: { visual: V }) {
  if (visual.type === "none") return null;
  return (
    <section aria-label={visual.title} className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-semibold">{visual.title}</h2>
      {visual.type === "table" ? <DataTable v={visual} /> : <BarChart v={visual} />}
      {visual.note && <p className="mt-3 text-xs text-muted">{visual.note}</p>}
    </section>
  );
}

function DataTable({ v }: { v: Extract<V, { type: "table" }> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            {v.columns.map((c) => (
              <th key={c} className="pb-2 pr-4 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="tnum py-2.5 pr-4"><Ph>{cell}</Ph></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BarChart({ v }: { v: Extract<V, { type: "chart" }> }) {
  const max = Math.max(...v.points.map((p) => p.value), 1);
  const w = 100 / v.points.length;
  return (
    <svg viewBox="0 0 100 48" role="img" aria-label={v.title} className="h-44 w-full">
      {v.points.map((p, i) => {
        const h = (p.value / max) * 34;
        return (
          <g key={p.label}>
            <rect x={i * w + w * 0.2} y={38 - h} width={w * 0.6} height={h} rx={1} fill="var(--accent)" opacity={0.85} />
            <text x={i * w + w / 2} y={45} textAnchor="middle" fontSize={3.2} fill="var(--muted)">{p.label}</text>
          </g>
        );
      })}
      <line x1={0} x2={100} y1={38} y2={38} stroke="var(--border-strong)" strokeWidth={0.3} />
    </svg>
  );
}
