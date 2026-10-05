import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 11. Business Performance
 * Landing page summary (kickoff v3 §5): How the business is performing: margins, segment results, the key operating metric for its business model, workforce, and product pipeline.
 */
export default parent({
  order: 11,
  title: "Business Performance",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Business Performance: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Gross margin", "Operating margin", "Total revenue", "Sector KPI"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Margin trend", ["Q-3", "Q-2", "Q-1", "Latest"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Margin Trends", {
      headlineHint: "Current gross and operating margin.",
      unlocksHint: "Historical trend and the drivers of change.",
    }),
    child("Segment Revenue", {
      headlineHint: "Total revenue.",
      unlocksHint: "Revenue by business segment.",
    }),
    child("Sector-Specific KPI", {
      headlineHint: "The key metric for this business model (e.g., churn for software, same-store sales for retail, net interest margin for banks).",
      unlocksHint: "KPI history and drivers. One per company, chosen by analysts.",
    }),
    child("Labor & Headcount", {
      headlineHint: "Layoffs, hiring freezes or wage pressure.",
      unlocksHint: "Headcount and labor detail we already cover.",
      flags: ["check"],
    }),
    child("Product & Patent Pipeline", {
      headlineHint: "A new filing or product launch.",
      unlocksHint: "Full pipeline and competitive positioning.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Performance detail done? See the questions behind the stock." },
});
