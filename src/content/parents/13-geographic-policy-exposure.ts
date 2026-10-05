import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 13. Geographic & Policy Exposure
 * Landing page summary (kickoff v3 §5): Where the company earns its revenue and how exposed it is to tariffs, trade and geopolitics.
 */
export default parent({
  order: 13,
  title: "Geographic & Policy Exposure",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Geographic & Policy Exposure: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Top region share", "Top country share", "Tariff-exposed costs"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Revenue by region", ["Region", "Share of revenue", "Change"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Geographic Revenue Split", {
      headlineHint: "Share of revenue from key regions or countries.",
      unlocksHint: "Full geographic revenue breakdown.",
    }),
    child("Tariff & Geopolitical Exposure", {
      headlineHint: "Tariff-exposed costs or country concentration.",
      unlocksHint: "Country and product exposure detail used in our coverage.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Exposure mapped. See how investors are weighing the risk." },
});
