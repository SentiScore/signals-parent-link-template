import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 7. Short & Options Positioning
 * Landing page summary (kickoff v3 §5): Bearish positioning and derivatives activity: short interest, crowding and options activity.
 */
export default parent({
  order: 7,
  title: "Short & Options Positioning",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Short & Options Positioning: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Short interest (% of float)", "Days to cover", "Options volume", "Trading volume vs normal"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Short interest, recent months", ["M-5", "M-4", "M-3", "M-2", "M-1", "Latest"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Short Interest", {
      headlineHint: "Short interest as a percentage of float.",
      unlocksHint: "Trend over recent months.",
      flags: ["check"],
    }),
    child("Short Crowding", {
      headlineHint: "Signs of a crowded short (e.g., days to cover).",
      unlocksHint: "Days-to-cover and borrow or squeeze-risk detail we already cover.",
      flags: ["check"],
    }),
    child("Options Activity", {
      headlineHint: "That options volume is unusual.",
      unlocksHint: "Specific strikes and expirations involved.",
      flags: ["check"],
    }),
    child("Unusual Trading Volume", {
      headlineHint: "That trading volume is elevated.",
      unlocksHint: "Historical volume pattern for comparison.",
      flags: ["watch"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Positioning explored? See the questions investors are asking next." },
});
