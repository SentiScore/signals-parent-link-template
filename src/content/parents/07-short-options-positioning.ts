import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 7. Short & Options Positioning
 * Landing page summary (kickoff v3 §5): Bearish positioning and derivatives activity: short interest, crowding and options activity.
 */
export default parent({
  order: 7,
  title: "Short & Options Positioning",
  // One short line in the standard link block of every story: "Short & Options Positioning: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Short interest (% of float)", "Days to cover", "Options volume", "Trading volume vs normal"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: chart("Short interest, recent months", ["M-5", "M-4", "M-3", "M-2", "M-1", "Latest"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Short Interest", {
      hint: "Trend over recent months.",
      flags: ["check"],
    }),
    child("Short Crowding", {
      hint: "Days-to-cover and borrow or squeeze-risk detail we already cover.",
      flags: ["check"],
    }),
    child("Options Activity", {
      hint: "Specific strikes and expirations involved.",
      flags: ["check"],
    }),
    child("Unusual Trading Volume", {
      hint: "Historical volume pattern for comparison.",
      flags: ["watch"],
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Positioning explored? See the questions investors are asking next." },
});
