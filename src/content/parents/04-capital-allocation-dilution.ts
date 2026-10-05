import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 4. Capital Allocation & Dilution
 * Landing page summary (kickoff v3 §5): How management is using cash: capital expenditure, buybacks, dividends, net share count and returns on capital.
 */
export default parent({
  order: 4,
  title: "Capital Allocation & Dilution",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Capital Allocation & Dilution: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Planned capex", "Buyback spend", "Dividend", "Diluted share count"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Uses of cash", ["Use", "Amount", "Change"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Capital Expenditure", {
      headlineHint: "Planned capital expenditure for the year.",
      unlocksHint: "Breakdown by project or segment.",
    }),
    child("Share Buybacks", {
      headlineHint: "Total buyback spend.",
      unlocksHint: "Timing and price levels of purchases.",
    }),
    child("Dividend Policy", {
      headlineHint: "Dividend amount and any change.",
      unlocksHint: "Payout ratio history and a sustainability read.",
    }),
    child("Net Share Count & Dilution", {
      headlineHint: "Whether the diluted share count rose or fell.",
      unlocksHint: "Share count history: buybacks vs. stock compensation, convertibles and new issuance.",
    }),
    child("Capital Allocation Scorecard", {
      headlineHint: "Direction of returns on capital or free cash flow.",
      unlocksHint: "Simple scorecard: return on invested capital, free cash flow vs. net income, uses of cash.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Where the cash goes is one question. Here are the rest." },
});
