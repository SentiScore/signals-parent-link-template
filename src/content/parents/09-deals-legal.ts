import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 9. Deals & Legal
 * Landing page summary (kickoff v3 §5): Transactions and legal or regulatory matters affecting the company.
 */
export default parent({
  order: 9,
  title: "Deals & Legal",
  // One short line in the standard link block of every story: "Deals & Legal: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Latest deal terms", "Open cases", "Potential exposure"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Deals and legal matters", ["Matter", "Status", "Date"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("M&A Activity", {
      hint: "Valuation multiples and deal structure.",
    }),
    child("Litigation & Regulatory Action", {
      hint: "Underlying filings and potential financial exposure.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Deals and legal covered. Curious what investors make of them?" },
});
