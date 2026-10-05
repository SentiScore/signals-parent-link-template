import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 14. Peers & Competitors
 * Landing page summary (kickoff v3 §5): How the company ranks against its peer group on key metrics, with links into each peer's own landing pages.
 */
export default parent({
  order: 14,
  title: "Peers & Competitors",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Peers & Competitors: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Rank vs peers", "Best-ranked metric", "Weakest-ranked metric"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Peer ranking", ["Peer", "Metric", "Rank"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Full Peer Comparison", {
      headlineHint: "Relative ranking vs. peers.",
      unlocksHint: "Full side-by-side metrics table.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Peers compared. Want the wider investor conversation on {company}?" },
});
