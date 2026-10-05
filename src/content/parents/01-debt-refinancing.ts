import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 1. Debt & Refinancing
 * Landing page summary (kickoff v3 §5): Debt summary: total debt, leverage ratios, current credit rating and near-term maturities, with how the ratios are calculated.
 */
export default parent({
  order: 1,
  title: "Debt & Refinancing",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Debt & Refinancing: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Total debt", "Debt-to-equity", "Credit rating", "Due in 12–24 months"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Near-term debt maturities", ["Year", "Amount due", "Instrument"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Bond & Debt Schedule", {
      headlineHint: "Total debt outstanding and debt-to-equity.",
      unlocksHint: "Instrument-by-instrument breakdown (coupon, maturity) and how the ratios were calculated.",
    }),
    child("Maturity Wall", {
      headlineHint: "Debt due in the next 12–24 months.",
      unlocksHint: "Year-by-year maturity schedule.",
    }),
    child("Credit Rating History", {
      headlineHint: "Current rating and outlook.",
      unlocksHint: "Full rating history with each agency's stated rationale.",
    }),
    child("Covenant & Refinancing Terms", {
      headlineHint: "Whether covenant headroom or refinancing conditions tightened.",
      unlocksHint: "Leverage and interest-coverage ratios, rating outlook, and any amendment or refinancing risk we already cover.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Debt is just one question investors ask about {company}." },
});
