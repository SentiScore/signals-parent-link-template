import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 3. Earnings Quality
 * Landing page summary (kickoff v3 §5): Whether reported earnings are backed by cash: cash conversion, the gap between GAAP and adjusted earnings, and any restatement or auditor change.
 */
export default parent({
  order: 3,
  title: "Earnings Quality",
  // One short line in the standard link block of every story: "Earnings Quality: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Operating cash flow / net income", "GAAP vs adjusted gap", "Restatement or auditor change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Net income vs operating cash flow", ["Year -3", "Year -2", "Year -1", "Latest"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Cash Conversion", {
      hint: "Multi-year walk of net income vs. operating cash flow.",
    }),
    child("Non-GAAP Adjustments", {
      hint: "List of add-backs and one-time items.",
    }),
    child("Restatements & Auditor Changes", {
      hint: "Details, timing and stated reasons.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Earnings checked? See what the wider investor crowd is asking." },
});
