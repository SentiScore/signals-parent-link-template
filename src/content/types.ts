/**
 * Content contract for the parent pages: the fields the content agent (pillar 1) fills per company.
 *
 * Everything typed here is company-specific. Everything fixed per category (titles, column headers,
 * metric lists, due-period buckets, refresh triggers) lives in the templates and taxonomy instead,
 * so the agent cannot change a page's shape. Dates are ISO strings (YYYY-MM-DD).
 */
import type { Cluster, TemplateCode, TopicCode } from "./taxonomy";

export type CompanyLink = {
  code: TopicCode;
  /** Core codes use their own template; S12-S15 name the core template of their cluster. */
  template: TemplateCode;
};

export type Company = {
  /** Stable id used in links and hit logs, e.g. "aapl". */
  id: string;
  name: string;
  /** Live parent links in slot order. A dormant topic is simply absent. */
  links: CompanyLink[];
  /** C10 peer set: exactly seven company ids, fixed for the pilot. */
  peers: string[];
};

/** A source document. Figures point at one by index. */
export type Source = { document: string; section: string; filed: string };

/** One figure value. `value: null` means not found in source: the figure is left out and the gap stated. */
export type Figure = { value: string | null; period: string; source: number };

type Common = {
  company: Pick<Company, "id" | "name">;
  code: TopicCode;
  cluster: Cluster;
  /** Block 1 promise line. Word for word the link text in the report. */
  promise: string;
  refreshedOn: string;
  /** When the substance of the page last changed. Logged with every hit as weeks-since-change. */
  contentChangedOn: string;
  /** Block 4: three to five bullets, under 25 words each. Descriptive only. */
  shows: string[];
  /** Block 5: 40 to 80 words. Method, inclusions, exclusions, source, caveat. */
  howToRead: string;
  /** Block 6. */
  sources: Source[];
  verifiedBy: string;
  verifiedOn: string;
};

/** C01 Revenue mix. Standard layout; workbook "Example page". */
export type C01Content = Common & {
  template: "C01";
  asOf: string;
  /** Five figures. Labels are company-specific and carry their unit. */
  figures: (Figure & { label: string })[];
  /** Eight quarters (Q-7 to Q-0). Column headers are company-specific. */
  exhibit: { columns: string[]; rows: { quarter: string; cells: (string | null)[] }[] };
};

/** C02 Margins. Exhibit first. */
export type C02Content = Common & {
  template: "C02";
  asOf: string;
  /** The two disclosed categories whose margins are compared, e.g. ["Products", "Services"]. */
  categories: [string, string];
  figures: { categoryA: Figure; categoryB: Figure; spread: Figure; spreadChange: Figure; consolidated: Figure };
  /** Eight quarters, three series at the hard limit. Percent values; null where not disclosed. */
  chart: { quarters: string[]; categoryA: (number | null)[]; categoryB: (number | null)[]; consolidated: (number | null)[] };
};

/** C05 Capex. Two exhibits on two clocks; no single page-level as-of date. */
export type C05Content = Common & {
  template: "C05";
  figures: {
    capexLatest: Figure;
    capexTtm: Figure;
    capexToOcf: Figure;
    commitments: Figure;
    dueWithinYear: Figure;
  };
  exhibitA: {
    asOf: string;
    rows: {
      quarter: string;
      capex: string | null;
      capexToRevenue: string | null;
      capexToOcf: string | null;
      depreciation: string | null;
    }[];
  };
  exhibitB: {
    asOf: string;
    /** One line: when the commitments note next moves. */
    nextMove: string;
    /** $m by due period, in bucket order: under 1 year, 1-3, 3-5, over 5. */
    buckets: [number, number, number, number];
  };
  /** Where the build runs through leases, name it here rather than folding it into capex. */
  leaseNote?: string;
};

/** C07 Legal docket. List layout; no figures strip. Counts are derived from the register. */
export type C07Content = Common & {
  template: "C07";
  /** The page is "confirmed to" this date, not "refreshed". */
  confirmedTo: string;
  register: {
    id: string;
    matter: string;
    jurisdiction: string;
    /** The court's or regulator's own term. */
    stage: string;
    opened: string;
    /** Last date confirmed on the docket. Hidden automatically once it has passed. */
    nextKnownDate: string | null;
    /** Only what the company itself disclosed; null renders "None disclosed". */
    exposure: string | null;
  }[];
};

export const C10_METRICS = [
  "Rev. growth",
  "Gross margin",
  "Op. margin",
  "FCF margin",
  "Capex / rev.",
  "Net cash",
  "R&D / rev.",
  "Share count chg.",
  "Multiple",
] as const;
export type C10Metric = (typeof C10_METRICS)[number];

/** C10 Peer ranking. Comparison layout; the only template that links out (tracked rotation). */
export type C10Content = Common & {
  template: "C10";
  asOf: string;
  /** Used in the promise and labels, e.g. "hardware and platform". */
  sector: string;
  figures: {
    /** The three metrics the figures strip ranks on, in order. */
    rankedOn: [C10Metric, C10Metric, C10Metric];
    ranks: [Figure, Figure, Figure];
    peerMedian: Figure;
    asOfRange: Figure;
  };
  /** This company first, then its seven peers. Every row carries its own period. */
  rows: { companyId: string; name: string; period: string; values: Record<C10Metric, string | null> }[];
  median: Record<C10Metric, string | null>;
};

export type PageContent = C01Content | C02Content | C05Content | C07Content | C10Content;
