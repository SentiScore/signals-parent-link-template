import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 10. Guidance & Estimates
 * Landing page summary (kickoff v3 §5): Where expectations stand: company guidance, analyst estimates and targets, and management tone.
 */
export default parent({
  order: 10,
  title: "Guidance & Estimates",
  // One short line in the standard link block of every story: "Guidance & Estimates: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Latest guidance", "Estimate direction", "Consensus price target"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Guidance and estimates", ["Metric", "Prior", "Latest"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Guidance Revisions", {
      hint: "Walk from old to new guidance, by driver.",
    }),
    child("Estimate Revision Path", {
      hint: "Recap of recent estimate revisions.",
    }),
    child("Analyst Price Targets", {
      hint: "Individual analyst targets and rationale.",
    }),
    child("Management Tone Shift", {
      hint: "Specific language changes vs. the prior quarter's call.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Expectations mapped. See how investors are framing {company}." },
});
