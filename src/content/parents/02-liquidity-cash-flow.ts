import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 2. Liquidity & Cash Flow
 * Landing page summary (kickoff v3 §5): Liquidity snapshot: cash on hand, current ratio, direction of the cash cycle, and any material off-balance-sheet items.
 */
export default parent({
  order: 2,
  title: "Liquidity & Cash Flow",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Liquidity & Cash Flow: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Cash on hand", "Current ratio", "Cash cycle (days)", "Off-balance-sheet items"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Liquidity snapshot", ["Component", "Amount", "Change"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Cash & Liquidity Position", {
      headlineHint: "Cash on hand and current ratio.",
      unlocksHint: "Components: cash equivalents, short-term investments, undrawn credit lines.",
    }),
    child("Working Capital & Cash Cycle", {
      headlineHint: "Whether the cash cycle lengthened or shortened.",
      unlocksHint: "Receivable days, inventory days and payable days, with trend.",
    }),
    child("Off-Balance-Sheet Obligations", {
      headlineHint: "That material off-balance-sheet items exist.",
      unlocksHint: "Leases, guarantees and contingent liabilities.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Cash is only half the story. See what else investors are asking." },
});
