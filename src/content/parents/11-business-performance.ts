import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 11. Business Performance
 * Landing page summary (kickoff v3 §5): How the business is performing: margins, segment results, the key operating metric for its business model, workforce, and product pipeline.
 */
export default parent({
  order: 11,
  title: "Business Performance",
  // One short line in the standard link block of every story: "Business Performance: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Gross margin", "Operating margin", "Total revenue", "Sector KPI"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Margin trend", ["Q-3", "Q-2", "Q-1", "Latest"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Margin Trends", {
      hint: "Historical trend and the drivers of change.",
    }),
    child("Segment Revenue", {
      hint: "Revenue by business segment.",
    }),
    child("Sector-Specific KPI", {
      hint: "KPI history and drivers. One per company, chosen by analysts.",
    }),
    child("Labor & Headcount", {
      hint: "Headcount and labor detail we already cover.",
      flags: ["check"],
    }),
    child("Product & Patent Pipeline", {
      hint: "Full pipeline and competitive positioning.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Performance detail done? See the questions behind the stock." },
});
