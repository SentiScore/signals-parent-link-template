import { CATEGORIES } from "@/content/taxonomy";
import { C10_METRICS, type C10Content } from "@/content/types";
import { DataTable, Exhibit, FiguresStrip, GapNote, HowToRead, partition, Provenance, TitleBlock, WhatItShows, fmtDate } from "@/components/blocks";

/** Drafting note: if fewer than four peers report a metric, the column is dropped rather than shipped mostly empty. */
const MIN_PEERS_REPORTING = 4;

/**
 * C10 Peer ranking and rotation. Comparison layout, exhibit-led. The only template that links out of its
 * topic: each peer link is a tracked rotation link to that peer's own C10 page. Each row carries its own
 * period and the peer-set median sits in the table as its own row.
 * Title · Ranking table · Figures · What it shows · How to read it · Peer links · Sources.
 */
export function C10({ page, peerHref }: { page: C10Content; peerHref: (companyId: string) => string | null }) {
  const cat = CATEGORIES.C10;
  const [self, ...peers] = page.rows;
  const metrics = C10_METRICS.filter((m) => peers.filter((r) => r.values[m] !== null).length >= MIN_PEERS_REPORTING);
  const dropped = C10_METRICS.filter((m) => !metrics.includes(m)).map((m) => `${m} (fewer than ${MIN_PEERS_REPORTING} peers report it)`);
  const f = page.figures;
  const { shown, missing } = partition([
    ...f.rankedOn.map((m, i) => ({ ...f.ranks[i], label: `Rank on ${m} (of ${page.rows.length})` })),
    { ...f.peerMedian, label: `Peer-set median, ${f.rankedOn[0]}` },
    { ...f.asOfRange, label: "As-of date range across the set" },
  ]);
  const stamps = [`As of: ${fmtDate(page.asOf)}`, `Refreshed: ${fmtDate(page.refreshedOn)}`, `Next refresh: ${cat.nextRefresh}`];

  return (
    <>
      <TitleBlock title={cat.title} promise={page.promise} meta={stamps} />
      <Exhibit title={`${self.name} against its ${peers.length} closest ${page.sector} peers`} note={<GapNote missing={dropped} />}>
        <DataTable
          columns={["Company", ...metrics, "Period"]}
          rows={[
            ...page.rows.map((r) => ({
              key: r.companyId,
              highlight: r.companyId === self.companyId,
              cells: [r.name, ...metrics.map((m) => r.values[m]), r.period],
            })),
            { key: "median", muted: true, cells: ["Peer-set median", ...metrics.map((m) => page.median[m]), "—"] },
          ]}
        />
      </Exhibit>
      <FiguresStrip figures={shown} />
      {missing.length > 0 && <div className="-mt-4 text-xs text-muted"><GapNote missing={missing} /></div>}
      <WhatItShows items={page.shows} />
      <HowToRead text={page.howToRead} />
      <nav aria-label="Peer pages">
        <h2 className="text-sm font-semibold">Peer pages</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {peers.map((p) => {
            const href = peerHref(p.companyId);
            return (
              <li key={p.companyId}>
                {href ? (
                  <a href={href} className="inline-block rounded-full border border-line-strong px-3 py-1 text-sm hover:border-accent hover:text-accent-2">
                    {p.name}
                  </a>
                ) : (
                  <span className="inline-block rounded-full border border-line px-3 py-1 text-sm text-muted">{p.name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <Provenance sources={page.sources} stamps={stamps} verifiedBy={page.verifiedBy} verifiedOn={page.verifiedOn} />
    </>
  );
}
