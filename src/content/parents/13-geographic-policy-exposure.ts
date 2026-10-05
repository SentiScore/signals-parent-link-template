import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 13. Geographic & Policy Exposure
 * Landing page summary (kickoff v3 §5): Where the company earns its revenue and how exposed it is to tariffs, trade and geopolitics.
 */
export default parent({
  order: 13,
  title: "Geographic & Policy Exposure",
  // One short line in the standard link block of every story: "Geographic & Policy Exposure: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Top region share", "Top country share", "Tariff-exposed costs"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Revenue by region", ["Region", "Share of revenue", "Change"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Geographic Revenue Split", {
      hint: "Full geographic revenue breakdown.",
    }),
    child("Tariff & Geopolitical Exposure", {
      hint: "Country and product exposure detail used in our coverage.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Exposure mapped. See how investors are weighing the risk." },
});
