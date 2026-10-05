import type { CompanyContent } from "../types";

/** Copy this file per company. Everything under `parents` is optional. */
export const example: CompanyContent = {
  id: "example-co",
  name: "Example Co",
  ticker: "EXPL",
  parents: {
    // key = parent slug
    "debt-refinancing": {
      // The hyperlinked text in this company's report link block.
      promise: "Lorem ipsum dolor sit amet, company-specific promise.",
      // Arrays (metrics, table rows) are replaced whole, objects are merged.
      summary: { body: "Lorem ipsum dolor sit amet, company-specific summary." },
      children: {
        // key = child id. Put real links here as the analyst team delivers them.
        maturity_wall: { href: "https://example.com/replace-me", headline: "Lorem ipsum", promise: "Lorem ipsum dolor sit amet." },
        // Dormant child: disappears from the page until set back to true.
        credit_rating_history: { live: false },
      },
    },
    "business-performance": {
      children: {
        sector_specific_kpi: { title: "Same-Store Sales" }, // the analyst-chosen sector KPI
      },
    },
  },
};
