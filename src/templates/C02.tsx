import { CATEGORIES } from "@/content/taxonomy";
import type { C02Content } from "@/content/types";
import { Exhibit, FiguresStrip, GapNote, HowToRead, partition, Provenance, TitleBlock, WhatItShows, fmtDate } from "@/components/blocks";
import { LineChart } from "@/components/charts";

/**
 * C02 Margins and what moves them. Exhibit first: the only template where the chart comes before the
 * figures, because the shape of two diverging lines answers the question faster than any number.
 * Title · Exhibit · Figures · What it shows · How to read it · Sources.
 */
export function C02({ page }: { page: C02Content }) {
  const cat = CATEGORIES.C02;
  const [a, b] = page.categories;
  const f = page.figures;
  const { shown, missing } = partition([
    { ...f.categoryA, label: `${a} margin, latest quarter (%)` },
    { ...f.categoryB, label: `${b} margin, latest quarter (%)` },
    { ...f.spread, label: "Spread between them (pp)" },
    { ...f.spreadChange, label: "Change in the spread vs. prior year (pp)" },
    { ...f.consolidated, label: "Consolidated margin (%)" },
  ]);
  const stamps = [`As of: ${fmtDate(page.asOf)}`, `Refreshed: ${fmtDate(page.refreshedOn)}`, `Next refresh: ${cat.nextRefresh}`];

  return (
    <>
      <TitleBlock title={cat.title} promise={page.promise} meta={stamps} />
      <Exhibit title={`${a} and ${b} margin, eight quarters, as of ${fmtDate(page.asOf)}`} note={<GapNote missing={missing} />}>
        <LineChart
          labels={page.chart.quarters}
          unit="Margin (%)"
          shadeBetween={[0, 1]}
          series={[
            { name: `${a} margin (%)`, values: page.chart.categoryA, color: "a" },
            { name: `${b} margin (%)`, values: page.chart.categoryB, color: "b" },
            { name: "Consolidated (%)", values: page.chart.consolidated, color: "c", dashed: true },
          ]}
        />
      </Exhibit>
      <FiguresStrip figures={shown} />
      <WhatItShows items={page.shows} />
      <HowToRead text={page.howToRead} />
      <Provenance sources={page.sources} stamps={stamps} verifiedBy={page.verifiedBy} verifiedOn={page.verifiedOn} />
    </>
  );
}
