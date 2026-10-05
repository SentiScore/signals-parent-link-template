import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 8. Governance & Activism
 * Landing page summary (kickoff v3 §5): Who controls the company and any pressure on its governance.
 */
export default parent({
  order: 8,
  title: "Governance & Activism",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Governance & Activism: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Control structure", "Activist involvement", "Latest board change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Control and governance snapshot", ["Item", "Detail", "Date"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Activist Involvement", {
      headlineHint: "That an activist has taken a position.",
      unlocksHint: "The activist's stated demands and track record.",
    }),
    child("Control & Related-Party Issues", {
      headlineHint: "A dual-class structure or related-party transaction.",
      unlocksHint: "Control structure and related-party details.",
    }),
    child("Board Changes & Disputes", {
      headlineHint: "A board change or dispute.",
      unlocksHint: "Board composition changes and background.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Governance covered. Want the wider investor conversation?" },
});
