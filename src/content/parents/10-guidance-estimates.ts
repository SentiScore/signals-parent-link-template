import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 10. Guidance & Estimates
 * Landing page summary (kickoff v3 §5): Where expectations stand: company guidance, analyst estimates and targets, and management tone.
 */
export default parent({
  order: 10,
  title: "Guidance & Estimates",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Guidance & Estimates: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Latest guidance", "Estimate direction", "Consensus price target"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Guidance and estimates", ["Metric", "Prior", "Latest"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Guidance Revisions", {
      headlineHint: "The new guidance figure.",
      unlocksHint: "Walk from old to new guidance, by driver.",
    }),
    child("Estimate Revision Path", {
      headlineHint: "Which direction estimates have been moving.",
      unlocksHint: "Recap of recent estimate revisions.",
    }),
    child("Analyst Price Targets", {
      headlineHint: "New consensus price target.",
      unlocksHint: "Individual analyst targets and rationale.",
    }),
    child("Management Tone Shift", {
      headlineHint: "That management's tone has shifted.",
      unlocksHint: "Specific language changes vs. the prior quarter's call.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Expectations mapped. See how investors are framing {company}." },
});
