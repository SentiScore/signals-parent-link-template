import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 2. Liquidity & Cash Flow
 * Landing page summary (kickoff v3 §5): Liquidity snapshot: cash on hand, current ratio, direction of the cash cycle, and any material off-balance-sheet items.
 */
export default parent({
  order: 2,
  title: "Liquidity & Cash Flow",
  // One short line in the standard link block of every story: "Liquidity & Cash Flow: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Cash on hand", "Current ratio", "Cash cycle (days)", "Off-balance-sheet items"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Liquidity snapshot", ["Component", "Amount", "Change"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Cash & Liquidity Position", {
      hint: "Components: cash equivalents, short-term investments, undrawn credit lines.",
    }),
    child("Working Capital & Cash Cycle", {
      hint: "Receivable days, inventory days and payable days, with trend.",
    }),
    child("Off-Balance-Sheet Obligations", {
      hint: "Leases, guarantees and contingent liabilities.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Cash is only half the story. See what else investors are asking." },
});
