import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 12. Customers, Supply Chain & Inventory
 * Landing page summary (kickoff v3 §5): Dependencies on either side of the business, and the demand picture from inventory and backlog.
 */
export default parent({
  order: 12,
  title: "Customers, Supply Chain & Inventory",
  // PROMISE = the hyperlinked text readers see in the standard link block of every report
  // (kickoff v3 §10, plan §3.2). One specific sentence on what the click gets them, e.g.
  // "see the full debt summary" renders as "Customers, Supply Chain & Inventory: <promise>".
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Customer concentration", "Key supplier dependency", "Inventory / backlog direction"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Dependency snapshot", ["Item", "Share or level", "Change"]),
  // 3-5 children. Each child card shows its `headline` (the finding, up front) and its `promise`
  // (the hyperlinked text). Set live: false on a child to take it off the page (dormant).
  children: [
    child("Customer Concentration", {
      headlineHint: "Whether concentration risk exists.",
      unlocksHint: "Largest customers and their share of revenue.",
    }),
    child("Supplier & Vendor Exposure", {
      headlineHint: "A key supplier dependency.",
      unlocksHint: "Specific suppliers and geographic exposure.",
    }),
    child("Inventory & Backlog", {
      headlineHint: "Whether inventory or backlog is rising or falling.",
      unlocksHint: "Detailed trend and what it implies for revenue.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Supply chain covered. Curious what investors want to know next?" },
});
