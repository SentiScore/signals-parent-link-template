import { CATEGORIES } from "@/content/taxonomy";
import type { C07Content } from "@/content/types";
import { DataTable, Exhibit, HowToRead, Provenance, TitleBlock, WhatItShows, fmtDate } from "@/components/blocks";

const DAY = 864e5;

/**
 * C07 Legal and regulatory docket. List layout: no figures strip, the register is the page, and the
 * counts a reader needs sit in the title block (derived from the register, so they cannot drift).
 * Headed "confirmed to", not "refreshed". A next-known date that has passed is hidden automatically
 * until it is reconfirmed. Title · Register · What it shows · How to read it · Sources.
 */
export function C07({ page, today }: { page: C07Content; today: string }) {
  const cat = CATEGORIES.C07;
  const now = Date.parse(today);
  const upcoming = (d: string | null) => d !== null && Date.parse(d) >= now;
  const within90 = page.register.filter((m) => upcoming(m.nextKnownDate) && Date.parse(m.nextKnownDate!) - now <= 90 * DAY).length;
  const jurisdictions = new Set(page.register.map((m) => m.jurisdiction)).size;
  const stamps = [`Confirmed to: ${fmtDate(page.confirmedTo)}`, `Next refresh: ${cat.nextRefresh}`];

  return (
    <>
      <TitleBlock
        title={cat.title}
        promise={page.promise}
        meta={[
          `${page.register.length} open matters`,
          `${jurisdictions} jurisdictions`,
          `${within90} with a date in the next 90 days`,
          ...stamps,
        ]}
      />
      <Exhibit title={`Open matters, confirmed to ${fmtDate(page.confirmedTo)}`}>
        <DataTable
          columns={["Matter", "Jurisdiction and authority", "Stage", "Opened", "Next known date", "Disclosed exposure"]}
          rows={page.register.map((m) => ({
            key: m.id,
            cells: [
              <span key="m">
                <span className="mr-2 text-xs text-muted-2">{m.id}</span>
                {m.matter}
              </span>,
              m.jurisdiction,
              m.stage,
              fmtDate(m.opened),
              m.nextKnownDate === null ? (
                <span className="text-xs font-normal text-muted-2">None scheduled</span>
              ) : upcoming(m.nextKnownDate) ? (
                fmtDate(m.nextKnownDate)
              ) : (
                <span className="text-xs font-normal text-muted-2">Passed, awaiting reconfirmation</span>
              ),
              m.exposure ?? <span className="text-xs font-normal text-muted-2">None disclosed</span>,
            ],
          }))}
        />
      </Exhibit>
      <WhatItShows items={page.shows} />
      <HowToRead text={page.howToRead} />
      <Provenance sources={page.sources} stamps={stamps} verifiedBy={page.verifiedBy} verifiedOn={page.verifiedOn} />
    </>
  );
}
