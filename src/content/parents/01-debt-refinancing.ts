import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 1. Debt & Refinancing
 * Landing page summary (kickoff v3 §5): Debt summary: total debt, leverage ratios, current credit rating and near-term maturities, with how the ratios are calculated.
 */
export default parent({
  order: 1,
  title: "Debt & Refinancing",
  // One short line in the standard link block of every story: "Debt & Refinancing: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Total debt", "Debt-to-equity", "Credit rating", "Due in 12–24 months"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Near-term debt maturities", ["Year", "Amount due", "Instrument"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Bond & Debt Schedule", {
      hint: "Instrument-by-instrument breakdown (coupon, maturity) and how the ratios were calculated.",
    }),
    child("Maturity Wall", {
      hint: "Year-by-year maturity schedule.",
    }),
    child("Credit Rating History", {
      hint: "Full rating history with each agency's stated rationale.",
    }),
    child("Covenant & Refinancing Terms", {
      hint: "Leverage and interest-coverage ratios, rating outlook, and any amendment or refinancing risk we already cover.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Debt is just one question investors ask about {company}." },
});
