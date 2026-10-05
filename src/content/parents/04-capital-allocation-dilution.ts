import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 4. Capital Allocation & Dilution
 * Landing page summary (kickoff v3 §5): How management is using cash: capital expenditure, buybacks, dividends, net share count and returns on capital.
 */
export default parent({
  order: 4,
  title: "Capital Allocation & Dilution",
  // One short line in the standard link block of every story: "Capital Allocation & Dilution: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Planned capex", "Buyback spend", "Dividend", "Diluted share count"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Uses of cash", ["Use", "Amount", "Change"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Capital Expenditure", {
      hint: "Breakdown by project or segment.",
    }),
    child("Share Buybacks", {
      hint: "Timing and price levels of purchases.",
    }),
    child("Dividend Policy", {
      hint: "Payout ratio history and a sustainability read.",
    }),
    child("Net Share Count & Dilution", {
      hint: "Share count history: buybacks vs. stock compensation, convertibles and new issuance.",
    }),
    child("Capital Allocation Scorecard", {
      hint: "Simple scorecard: return on invested capital, free cash flow vs. net income, uses of cash.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Where the cash goes is one question. Here are the rest." },
});
