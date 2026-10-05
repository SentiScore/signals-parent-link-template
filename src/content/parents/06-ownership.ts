import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 6. Ownership
 * Landing page summary (kickoff v3 §5): Who owns the stock and how that is changing.
 */
export default parent({
  order: 6,
  title: "Ownership",
  // One short line in the standard link block of every story: "Ownership: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Institutional ownership", "Large filers entering or exiting", "Passive / index share"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Largest holders", ["Holder", "Position", "Change"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Institutional Ownership Changes", {
      hint: "Funds involved and the size of their position changes.",
    }),
    child("13F Additions & Exits", {
      hint: "Full filer list with position sizes.",
    }),
    child("Passive & Index Ownership", {
      hint: "Index weights and passive share of ownership.",
      flags: ["check"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Who owns it is one question. Browse the rest." },
});
