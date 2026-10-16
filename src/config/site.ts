/** Brand, destination and runtime switches. Everything an operator might retune lives here. */

export const BRAND_NAME = "Greenwich Research News Data";

/** The StockDashboard section on every parent page links here (tracked, see app/[quarter]/[token]/sd). */
export const SD_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://stockdashboard.com").replace(/\/$/, "");

/** Copy for the StockDashboard section. {company} is replaced at render time. */
export const SD_COPY = {
  eyebrow: "Optional detour",
  hook: "Want the retail investor's view of {company}?",
  cta: "Explore {company} on Stock Dashboard",
  reassurance: "Free to explore. Opens in a new tab, so this page stays where it is.",
};

/** Local review: enables the template menu at / and the in-memory hit log. NEVER set in production. */
export const PREVIEW = process.env.SIGNALS_PREVIEW === "1";
