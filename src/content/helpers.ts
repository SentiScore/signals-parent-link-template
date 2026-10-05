import type { ChildContent, Flag, Metric, ParentContent, Visual } from "./types";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const idify = (s: string) => slugify(s).replace(/-/g, "_");

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");

/** Placeholder text. Every placeholder starts with "Lorem ipsum" so it can be detected. */
export function lorem(kind: "line" | "sentence" | "paragraph" = "sentence"): string {
  const n = { line: 4, sentence: 10, paragraph: 36 }[kind];
  const text = Array.from({ length: n }, (_, i) => WORDS[i % WORDS.length]).join(" ");
  return kind === "line" ? text.charAt(0).toUpperCase() + text.slice(1) : text.charAt(0).toUpperCase() + text.slice(1) + ".";
}

export const isPlaceholder = (s: string | undefined) => !!s && /^lorem ipsum/i.test(s.trim());

export function child(title: string, opts: { id?: string; hint?: string; flags?: Flag[]; href?: string; live?: boolean } = {}): ChildContent {
  return {
    id: idify(title),
    slug: slugify(title),
    title,
    promise: lorem("sentence"),
    live: true,
    ...opts,
  };
}

export function table(title: string, columns: string[], rowCount = 3): Visual {
  return {
    type: "table",
    title,
    columns,
    rows: Array.from({ length: rowCount }, () => columns.map(() => "Lorem ipsum")),
  };
}

export function chart(title: string, labels: string[]): Visual {
  return { type: "chart", title, points: labels.map((label, i) => ({ label, value: 40 + ((i * 17) % 45) })) };
}

type ParentInput = Omit<ParentContent, "id" | "slug" | "live" | "summary" | "crossover"> & {
  summary: { body: string; metrics: (string | Metric)[] };
  crossover: { hook: string; cta?: string };
  live?: boolean;
  /** Set explicitly before renaming a live parent so the logged topic id stays stable. */
  id?: string;
};

export function parent(p: ParentInput): ParentContent {
  return {
    ...p,
    id: p.id ?? idify(p.title),
    slug: slugify(p.title),
    live: p.live ?? true,
    summary: {
      body: p.summary.body,
      metrics: p.summary.metrics.map((m) => (typeof m === "string" ? { label: m, value: "Lorem ipsum" } : m)),
    },
  };
}
