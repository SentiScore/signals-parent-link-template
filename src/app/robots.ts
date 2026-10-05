import type { MetadataRoute } from "next";

/**
 * These pages are reachable only through tracked links inside Greenwich stories and reports on
 * AlphaSense, LexisNexis, LSEG etc. No search engine or AI crawler may fetch anything.
 * robots.txt is a request, not a lock: the real gate is the link token (see README, "Not discoverable").
 */
const BOTS = ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot", "Applebot", "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "CCBot", "Google-Extended", "Bytespider", "Amazonbot", "FacebookBot", "cohere-ai"];

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }, ...BOTS.map((userAgent) => ({ userAgent, disallow: "/" }))] };
}
