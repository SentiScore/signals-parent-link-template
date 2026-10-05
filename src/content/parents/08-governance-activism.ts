import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 8. Governance & Activism
 * Landing page summary (kickoff v3 §5): Who controls the company and any pressure on its governance.
 */
export default parent({
  order: 8,
  title: "Governance & Activism",
  // One short line in the standard link block of every story: "Governance & Activism: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Control structure", "Activist involvement", "Latest board change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Control and governance snapshot", ["Item", "Detail", "Date"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Activist Involvement", {
      hint: "The activist's stated demands and track record.",
    }),
    child("Control & Related-Party Issues", {
      hint: "Control structure and related-party details.",
    }),
    child("Board Changes & Disputes", {
      hint: "Board composition changes and background.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Governance covered. Want the wider investor conversation?" },
});
