/**
 * Brand and behaviour settings. Everything a developer might retune lives here.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://stockdashboard.com").replace(/\/$/, "");
export const SITE_NAME = "Stock Dashboard";
/** Shown next to the wordmark so readers know whose research this is. */
export const RESEARCH_LABEL = "BST Research";

/** Local review mode: pages render without a link token. Must be off in production. */
export const PREVIEW = process.env.SIGNALS_PREVIEW === "1";

/** Kickoff v3 §3.5: keep child links to about 3-5 per parent. */
export const MAX_CHILDREN = 5;

/** Crossover (StockDashboard home) link. Tagged so the crossover click can be measured. */
export function crossoverUrl(parentId: string): string {
  const u = new URL(SITE_URL);
  u.searchParams.set("utm_source", "signals");
  u.searchParams.set("utm_medium", "parent_page");
  u.searchParams.set("utm_campaign", parentId);
  return u.toString();
}

/** Copy for the crossover strip. {company} is replaced at render time. */
export const CROSSOVER = {
  eyebrow: "Optional detour",
  cta: "Explore {company} on Stock Dashboard",
  reassurance: "Free to explore. Your research above stays one click away.",
};
