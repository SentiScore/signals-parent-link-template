import { CATEGORIES } from "@/content/taxonomy";
import type { C05Content } from "@/content/types";
import { DataTable, Exhibit, FiguresStrip, GapNote, HowToRead, partition, Provenance, TitleBlock, WhatItShows, fmtDate } from "@/components/blocks";
import { BarChart } from "@/components/charts";

const BUCKETS = ["Under 1 year", "1 to 3 years", "3 to 5 years", "Over 5 years"];

/**
 * C05 Capex and committed spend. Two exhibits on two clocks: the capex series moves every quarter, the
 * commitments note usually once a year. A single page-level as-of date is forbidden, so each exhibit
 * carries its own in its heading. Title · Figures · Exhibit A · Exhibit B · What it shows · How to read it · Sources.
 */
export function C05({ page }: { page: C05Content }) {
  const cat = CATEGORIES.C05;
  const { exhibitA: A, exhibitB: B } = page;
  const f = page.figures;
  const { shown, missing } = partition([
    { ...f.capexLatest, label: "Capital expenditure, latest quarter ($m)" },
    { ...f.capexTtm, label: "Trailing twelve-month capex ($m)" },
    { ...f.capexToOcf, label: "Capex as a share of operating cash flow (%)" },
    { ...f.commitments, label: `Contracted but unspent commitments ($m, as of ${fmtDate(B.asOf)})` },
    { ...f.dueWithinYear, label: "Share of commitments due within one year (%)" },
  ]);
  const asOf = [`Exhibit A as of: ${fmtDate(A.asOf)}`, `Exhibit B as of: ${fmtDate(B.asOf)}`];
  const stamps = [...asOf, `Refreshed: ${fmtDate(page.refreshedOn)}`, `Next refresh: ${cat.nextRefresh}`];
  const rows = A.rows.filter((r) => [r.capex, r.capexToRevenue, r.capexToOcf, r.depreciation].some((v) => v !== null));

  return (
    <>
      <TitleBlock title={cat.title} promise={page.promise} meta={stamps} />
      <FiguresStrip figures={shown} />
      <Exhibit title={`Exhibit A · Capex, eight quarters, as of ${fmtDate(A.asOf)}`} note={<GapNote missing={missing} />}>
        <DataTable
          columns={["Quarter", "Capex ($m)", "Capex / revenue (%)", "Capex / operating cash flow (%)", "Depreciation ($m)"]}
          rows={rows.map((r) => ({ key: r.quarter, cells: [r.quarter, r.capex, r.capexToRevenue, r.capexToOcf, r.depreciation] }))}
        />
      </Exhibit>
      <Exhibit
        title={`Exhibit B · Contracted but unspent commitments by due period, as of ${fmtDate(B.asOf)}`}
        note={
          <>
            <p>{B.nextMove}</p>
            {page.leaseNote && <p>{page.leaseNote}</p>}
          </>
        }
      >
        <BarChart unit="Contracted but unspent, by due period ($m)" bars={B.buckets.map((value, i) => ({ label: BUCKETS[i], value }))} />
      </Exhibit>
      <WhatItShows items={page.shows} />
      <HowToRead text={page.howToRead} />
      <Provenance sources={page.sources} stamps={stamps} verifiedBy={page.verifiedBy} verifiedOn={page.verifiedOn} />
    </>
  );
}
