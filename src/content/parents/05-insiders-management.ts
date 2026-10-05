import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 5. Insiders & Management
 * Landing page summary (kickoff v3 §5): Insider activity and management changes at a glance.
 */
export default parent({
  order: 5,
  title: "Insiders & Management",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Insiders & Management: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Net insider direction", "Latest grants or exercises", "Latest executive change"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Recent insider activity", ["Date", "Insider", "Action"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Insider Buying & Selling", {
      headlineHint: "Net direction of insider activity.",
      unlocksHint: "The insider transaction log.",
    }),
    child("Executive & Director Stock Plans", {
      headlineHint: "New grants or exercises.",
      unlocksHint: "Vesting schedules and strike prices.",
    }),
    child("Executive Changes", {
      headlineHint: "Who changed roles.",
      unlocksHint: "Background and compensation package.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Curious how other investors read insider moves?" },
});
