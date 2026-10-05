import { chart, child, lorem, parent, table } from "../helpers";

/**
 * 15. News & Stock Buzz
 * Landing page summary (kickoff v3 §5): Whether the company is in the news, and why. This bucket captures general attention, so the other parents can stay focused on specific concerns.
 */
export default parent({
  order: 15,
  title: "News & Stock Buzz",
  // One short line in the standard link block of every story: "News & Stock Buzz: <storyLine>".
  storyLine: lorem("line"),
  // One sentence: what the reader gets by clicking. Be specific.
  promise: lorem("sentence"),
  summary: {
    // Own real content on the landing page. Never just a menu.
    body: lorem("paragraph"),
    metrics: ["Stories this week", "Stock buzz level", "Top story of the year"],
  },
  // ONE table or chart we already produce. Replace the placeholder rows or points.
  visual: table("Recent and top stories", ["Date", "Story", "Why it mattered"]),
  // 3-5 children. Set live: false on a child to take it off the page (dormant).
  children: [
    child("Recent & Top News", {
      hint: "Recent stories plus the top stories of the past year and why they mattered.",
    }),
    child("Stock Buzz", {
      hint: "What is driving current attention.",
    }),
  ],
  // The quiet "visit Stock Dashboard" strip, shown below the child links.
  crossover: { hook: "In the news? See the questions investors are asking." },
});
