import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 5. Insiders & Management
 * Landing page summary (kickoff v3 §5): Insider activity and management changes at a glance.
 */
export default parent({
  order: 5,
  title: "Insiders & Management",
  // One short line in the standard link block of every story: "Insiders & Management: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Net insider direction", "Latest grants or exercises", "Latest executive change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Recent insider activity", ["Date", "Insider", "Action"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Insider Buying & Selling", {
      hint: "The insider transaction log.",
    }),
    child("Executive & Director Stock Plans", {
      hint: "Vesting schedules and strike prices.",
    }),
    child("Executive Changes", {
      hint: "Background and compensation package.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Curious how other investors read insider moves?" },
});
