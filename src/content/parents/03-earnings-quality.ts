import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 3. Earnings Quality
 * Landing page summary (kickoff v3 §5): Whether reported earnings are backed by cash: cash conversion, the gap between GAAP and adjusted earnings, and any restatement or auditor change.
 */
export default parent({
  order: 3,
  title: "Earnings Quality",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Earnings Quality: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Operating cash flow / net income", "GAAP vs adjusted gap", "Restatement or auditor change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Net income vs operating cash flow", ["Year -3", "Year -2", "Year -1", "Latest"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Cash Conversion", {
      headlineHint: "Whether operating cash flow kept pace with net income.",
      unlocksHint: "Multi-year walk of net income vs. operating cash flow.",
    }),
    child("Non-GAAP Adjustments", {
      headlineHint: "Gap between GAAP and adjusted earnings.",
      unlocksHint: "List of add-backs and one-time items.",
    }),
    child("Restatements & Auditor Changes", {
      headlineHint: "That a restatement or auditor change occurred.",
      unlocksHint: "Details, timing and stated reasons.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Earnings checked? See what the wider investor crowd is asking." },
});
