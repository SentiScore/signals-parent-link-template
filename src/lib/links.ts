/**
 * Dynamic links (live project doc, pillars 2 and 3).
 *
 *   /{quarter}/{token}        the parent page, e.g. /2026q4/<payload>.<signature>
 *   /{quarter}/{token}/sd     its StockDashboard section link (tracked, then redirected)
 *
 * The token is the link context itself, signed: product, issue, company, topic code, platform,
 * placement and (for peer rotation) the originating company. Nothing is stored per link, so the
 * volume of links (66 issues x 50 companies x 11-15 topics x 2 platforms x 4 products per quarter)
 * costs no storage and no lookup to serve. Every issue gets a different URL even when the page content
 * is identical, and a new quarter changes the path and the signing key, so old-quarter tokens cannot be
 * replayed into a new quarter. Links never expire.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { isTopicCode, type TopicCode } from "@/content/taxonomy";
import { PREVIEW } from "@/config/site";

export const PRODUCTS = ["dsr", "mini_dsr", "day_ahead_dsr", "peer_story"] as const;
export const PLATFORMS = ["lexisnexis", "lseg"] as const;
/** block = standard link block; in_text = anchor in a report section; peer_rotation = from a C10 page. */
export const PLACEMENTS = ["block", "in_text", "peer_rotation"] as const;

export type Product = (typeof PRODUCTS)[number];
export type Platform = (typeof PLATFORMS)[number];
export type Placement = (typeof PLACEMENTS)[number];

export type LinkContext = {
  /** e.g. "2026q4". Changes the URL path and the signing key at each quarter rollover. */
  quarter: string;
  product: Product;
  /** The report issue the link was minted for. */
  issue: string;
  company: string;
  code: TopicCode;
  platform: Platform;
  placement: Placement;
  /** peer_rotation only: the company whose C10 page the reader came from. */
  ref?: string;
};

const QUARTER = /^\d{4}q[1-4]$/;
const ID = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const SEP = "~";
/** 96-bit truncated HMAC-SHA256: ample against forgery for links, and keeps URLs short. */
const SIG_BYTES = 12;

const oneOf = <T extends string>(list: readonly T[], v: string): v is T => (list as readonly string[]).includes(v);
export const isQuarter = (q: string) => QUARTER.test(q);

let devSecretWarned = false;
function masterSecret(): string {
  const s = process.env.LINK_SECRET;
  if (s) return s;
  if (PREVIEW || process.env.NODE_ENV !== "production") {
    if (!devSecretWarned) console.warn("[links] LINK_SECRET not set; using an insecure development secret.");
    devSecretWarned = true;
    return "dev-only-not-secret";
  }
  throw new Error("LINK_SECRET must be set in production");
}

/** One key per quarter, derived from the master secret. Cached: derivation runs once per quarter per process. */
const keys = new Map<string, Buffer>();
function quarterKey(quarter: string): Buffer {
  let k = keys.get(quarter);
  if (!k) {
    k = createHmac("sha256", masterSecret()).update(`quarter:${quarter}`).digest();
    keys.set(quarter, k);
  }
  return k;
}

const sign = (quarter: string, payload: string) =>
  createHmac("sha256", quarterKey(quarter)).update(payload).digest().subarray(0, SIG_BYTES);

/** Mint the token for one link. Throws on an invalid context: a bad link must never be published. */
export function mintToken(ctx: LinkContext): string {
  if (!isQuarter(ctx.quarter)) throw new Error(`invalid quarter: ${ctx.quarter}`);
  for (const [k, v] of Object.entries({ issue: ctx.issue, company: ctx.company, ref: ctx.ref ?? "x" })) {
    if (!ID.test(v)) throw new Error(`invalid ${k}: ${v}`);
  }
  if ((ctx.placement === "peer_rotation") !== !!ctx.ref) throw new Error("ref is required for, and only for, peer_rotation");
  const payload = Buffer.from(
    [ctx.product, ctx.issue, ctx.company, ctx.code, ctx.platform, ctx.placement, ctx.ref ?? ""].join(SEP),
  ).toString("base64url");
  return `${payload}.${sign(ctx.quarter, payload).toString("base64url")}`;
}

export const pagePath = (ctx: LinkContext) => `/${ctx.quarter}/${mintToken(ctx)}`;

/** Verify and decode. null for anything forged, tampered, malformed or moved to another quarter. */
export function readToken(quarter: string, token: string): LinkContext | null {
  if (!isQuarter(quarter) || token.length > 512) return null;
  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1), "base64url");
  const expected = sign(quarter, payload);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  const [product, issue, company, code, platform, placement, ref] = Buffer.from(payload, "base64url")
    .toString()
    .split(SEP);
  if (
    !oneOf(PRODUCTS, product) ||
    !oneOf(PLATFORMS, platform) ||
    !oneOf(PLACEMENTS, placement) ||
    !isTopicCode(code) ||
    !ID.test(issue) ||
    !ID.test(company)
  ) {
    return null;
  }
  return { quarter, product, issue, company, code, platform, placement, ...(ref ? { ref } : {}) };
}

/** The quarter a date falls in, as used in link paths. */
export const quarterOf = (d: Date) => `${d.getUTCFullYear()}q${Math.floor(d.getUTCMonth() / 3) + 1}`;
