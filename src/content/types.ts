export type Flag = "check" | "watch";

export type Metric = { label: string; value: string; note?: string };

export type Visual =
  | { type: "table"; title: string; columns: string[]; rows: string[][]; note?: string }
  | { type: "chart"; title: string; points: { label: string; value: number }[]; unit?: string; note?: string }
  | { type: "none" };

export type ChildContent = {
  /** Stable topic id, logged as child_topic. Derived from the title. Do not change once live. */
  id: string;
  slug: string;
  title: string;
  /** Headline finding shown up front on the child card (kickoff v3 §5 "Headline shown"). */
  headline: string;
  /** PROMISE: the hyperlinked text on the child card. One specific sentence on what the click gets the reader (kickoff v3 §10). */
  promise: string;
  /**
   * Destination. Leave unset to use the built-in child page route
   * (/signals/<parent>/<child>). Set to any URL to point elsewhere.
   * Parent context (company, story, platform, placement, date, token) is appended automatically.
   */
  href?: string;
  /** false = dormant: removed from the page until it can be filled and refreshed. */
  live: boolean;
  /** Analyst reference: kickoff v3 §5 "Headline shown" text. Never rendered. */
  headlineHint?: string;
  /** Analyst reference: kickoff v3 §5 "Detail unlocked at the child link". Never rendered. */
  unlocksHint?: string;
  flags?: Flag[];
};

export type ParentContent = {
  /** Stable topic id, logged as parent_topic. Do not change once live. */
  id: string;
  slug: string;
  order: number;
  title: string;
  /** false = dormant: removed from the standard link block and the landing page. */
  live: boolean;
  /**
   * PROMISE: the hyperlinked text readers see in the report's standard link block, rendered
   * "<title>: <promise>" (kickoff v3 §10, plan §3.2). It is what readers decide to click on.
   * Not repeated on the landing page: the summary is what fulfils it (kickoff v3 §3.4).
   */
  promise: string;
  summary: { body: string; metrics: Metric[] };
  visual: Visual;
  children: ChildContent[];
  /** Peers parent only: links into each peer's own landing page (tracking, not content). */
  peerLinks?: { label: string; href: string }[];
  crossover: { hook: string; cta?: string };
};

/** Per-company overrides, deep-merged over the parent defaults. See content/companies. */
export type DeepPartial<T> = { [K in keyof T]?: T[K] extends (infer U)[] ? U[] : DeepPartial<T[K]> };
export type CompanyContent = {
  id: string;
  name: string;
  ticker?: string;
  /** Keyed by parent slug. Children are matched by child id. */
  parents?: Record<string, ParentOverride>;
};
export type ParentOverride = Omit<DeepPartial<ParentContent>, "children"> & {
  children?: Record<string, Partial<ChildContent>>;
};
