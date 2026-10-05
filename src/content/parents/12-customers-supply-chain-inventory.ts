import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 12. Customers, Supply Chain & Inventory
 * Landing page summary (kickoff v3 §5): Dependencies on either side of the business, and the demand picture from inventory and backlog.
 */
export default parent({
  order: 12,
  title: "Customers, Supply Chain & Inventory",
  // One short line in the standard link block of every story: "Customers, Supply Chain & Inventory: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Customer concentration", "Key supplier dependency", "Inventory / backlog direction"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Dependency snapshot", ["Item", "Share or level", "Change"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Customer Concentration", {
      hint: "Largest customers and their share of revenue.",
    }),
    child("Supplier & Vendor Exposure", {
      hint: "Specific suppliers and geographic exposure.",
    }),
    child("Inventory & Backlog", {
      hint: "Detailed trend and what it implies for revenue.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "Supply chain covered. Curious what investors want to know next?" },
});
