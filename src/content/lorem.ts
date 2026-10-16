/**
 * Placeholder content source. Every company-specific string is lorem ipsum so the developer can see
 * exactly which fields the content agent fills. Numbers exist only where a chart needs a shape;
 * they are illustrative and carry no meaning. Output is deterministic per company.
 */
import type { ContentSource } from "./source";
import { CATEGORIES, type TemplateCode, type TopicCode } from "./taxonomy";
import {
  C10_METRICS,
  type C10Metric,
  type Company,
  type Figure,
  type PageContent,
  type Source,
} from "./types";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et " +
  "dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip"
).split(" ");

/** n lorem words, starting at an offset so neighbouring fields read differently. */
function lorem(n: number, offset = 0): string {
  const s = Array.from({ length: n }, (_, i) => WORDS[(i + offset) % WORDS.length]).join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
const sentence = (n: number, offset = 0) => `${lorem(n, offset)}.`;

/** Small deterministic PRNG so each company's illustrative chart has its own shape. */
function rng(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 1000) / 1000;
}

const QUARTERS = ["Q-7", "Q-6", "Q-5", "Q-4", "Q-3", "Q-2", "Q-1", "Q-0"];
const isoDaysFromToday = (days: number) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);

const figure = (source = 0): Figure => ({ value: "Lorem", period: "Lorem ipsum", source });
const sources = (): Source[] => [
  { document: lorem(3), section: lorem(2, 5), filed: isoDaysFromToday(-40) },
  { document: lorem(3, 7), section: lorem(2, 11), filed: isoDaysFromToday(-130) },
];
const shows = (offset: number) => Array.from({ length: 4 }, (_, i) => sentence(14, offset + i * 3));

// ---------------------------------------------------------------------------------------------
// Companies. Eight placeholder companies so the C10 peer set (seven peers) resolves end to end.
// Each carries all five built templates; the first also shows two company-specific S links.
// ---------------------------------------------------------------------------------------------

const IDS = ["lorem-a", "lorem-b", "lorem-c", "lorem-d", "lorem-e", "lorem-f", "lorem-g", "lorem-h"];
const CORE: Company["links"] = (["C01", "C02", "C05", "C07", "C10"] as const).map((code) => ({ code, template: code }));

const COMPANIES: Company[] = IDS.map((id, i) => ({
  id,
  name: `Lorem Ipsum ${id.slice(-1).toUpperCase()}`,
  peers: IDS.filter((p) => p !== id),
  links:
    i === 0
      ? [
          ...CORE,
          // S links reuse a core template from their own cluster (C01: Operating performance,
          // C07: Forward-looking interest). The pair below shows the mechanism.
          { code: "S12", template: "C01" },
          { code: "S13", template: "C07" },
        ]
      : CORE,
}));
const BY_ID = new Map(COMPANIES.map((c) => [c.id, c]));

function page(company: Company, code: TopicCode, template: TemplateCode): PageContent {
  const r = rng(`${company.id}:${code}`);
  const common = {
    company: { id: company.id, name: company.name },
    code,
    cluster: CATEGORIES[template].cluster,
    promise: lorem(10, 2),
    refreshedOn: isoDaysFromToday(-3),
    contentChangedOn: isoDaysFromToday(-24),
    shows: shows(1),
    howToRead: sentence(62, 4),
    sources: sources(),
    verifiedBy: lorem(2, 9),
    verifiedOn: isoDaysFromToday(-2),
  };
  const asOf = isoDaysFromToday(-16);

  switch (template) {
    case "C01":
      return {
        ...common,
        template,
        asOf,
        figures: Array.from({ length: 5 }, (_, i) => ({ ...figure(0), label: `${lorem(5, i * 4)} (%)` })),
        exhibit: {
          columns: Array.from({ length: 5 }, (_, i) => lorem(2, i * 3)),
          rows: QUARTERS.map((quarter) => ({ quarter, cells: Array.from({ length: 5 }, () => "Lorem") })),
        },
      };

    case "C02": {
      const walk = (start: number) => {
        let v = start;
        return QUARTERS.map(() => +(v += (r() - 0.4) * 1.6).toFixed(1));
      };
      const a = walk(36);
      const b = walk(70);
      return {
        ...common,
        template,
        asOf,
        categories: [lorem(1, 0), lorem(1, 2)],
        figures: { categoryA: figure(), categoryB: figure(), spread: figure(), spreadChange: figure(), consolidated: figure() },
        chart: { quarters: QUARTERS, categoryA: a, categoryB: b, consolidated: a.map((x, i) => +((x + b[i]) / 2.1).toFixed(1)) },
      };
    }

    case "C05":
      return {
        ...common,
        template,
        figures: {
          capexLatest: figure(),
          capexTtm: figure(),
          capexToOcf: figure(),
          commitments: figure(1),
          dueWithinYear: figure(1),
        },
        exhibitA: {
          asOf,
          rows: QUARTERS.map((quarter) => ({
            quarter,
            capex: "Lorem",
            capexToRevenue: "Lorem",
            capexToOcf: "Lorem",
            depreciation: "Lorem",
          })),
        },
        exhibitB: {
          asOf: isoDaysFromToday(-200),
          nextMove: sentence(12, 6),
          buckets: [40 + r() * 10, 25 + r() * 10, 12 + r() * 8, 4 + r() * 6].map((n) => Math.round(n)) as [
            number,
            number,
            number,
            number,
          ],
        },
        leaseNote: sentence(16, 8),
      };

    case "C07":
      return {
        ...common,
        template,
        confirmedTo: isoDaysFromToday(0),
        register: Array.from({ length: 9 }, (_, i) => ({
          id: `M-${String(i + 1).padStart(2, "0")}`,
          matter: lorem(4, i * 2),
          jurisdiction: lorem(3, i + 5),
          stage: lorem(2, i + 9),
          opened: isoDaysFromToday(-400 - i * 60),
          // One passed date shows the automatic hiding; the rest fall either side of 90 days.
          nextKnownDate: i === 2 ? isoDaysFromToday(-5) : i % 3 === 1 ? null : isoDaysFromToday(20 + i * 18),
          exposure: i % 2 ? null : "Lorem ipsum",
        })),
      };

    case "C10": {
      const peers = [company.id, ...company.peers].map((id) => BY_ID.get(id)!);
      const values = () => Object.fromEntries(C10_METRICS.map((m) => [m, "Lorem"])) as Record<C10Metric, string | null>;
      return {
        ...common,
        template,
        asOf,
        sector: lorem(2, 13),
        figures: {
          rankedOn: ["Rev. growth", "Gross margin", "FCF margin"],
          ranks: [figure(), figure(), figure()],
          peerMedian: figure(),
          asOfRange: figure(),
        },
        rows: peers.map((p) => ({ companyId: p.id, name: p.name, period: "Lorem ipsum", values: values() })),
        median: values(),
      };
    }
  }
}

export const loremSource: ContentSource = {
  async getCompany(id) {
    return BY_ID.get(id) ?? null;
  },
  async listCompanies() {
    return COMPANIES;
  },
  async getPage(companyId, code) {
    const company = BY_ID.get(companyId);
    const link = company?.links.find((l) => l.code === code);
    return company && link ? page(company, code, link.template) : null;
  },
};
