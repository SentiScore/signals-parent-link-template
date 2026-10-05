import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 6. Ownership
 * Landing page summary (kickoff v3 §5): Who owns the stock and how that is changing.
 */
export default parent({
  order: 6,
  title: "Ownership",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Ownership: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Institutional ownership", "Large filers entering or exiting", "Passive / index share"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Largest holders", ["Holder", "Position", "Change"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Institutional Ownership Changes", {
      headlineHint: "Whether institutional ownership rose or fell.",
      unlocksHint: "Funds involved and the size of their position changes.",
    }),
    child("13F Additions & Exits", {
      headlineHint: "Which large filers entered or exited.",
      unlocksHint: "Full filer list with position sizes.",
    }),
    child("Passive & Index Ownership", {
      headlineHint: "Index membership or passive ownership share.",
      unlocksHint: "Index weights and passive share of ownership.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Who owns it is one question. Browse the rest." },
});
