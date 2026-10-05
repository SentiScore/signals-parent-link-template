/**
 * Link context. Every parent link carries it and every child link inherits it
 * (kickoff v3 §9): company, story, platform, placement, publish date, token.
 *
 * TODO(dev): the token `t` is opaque here. Replace `hasValidToken` with real
 * verification against the link-generation service.
 */
import { PREVIEW } from "@/config/site";

export type Placement = "standard_block" | "in_section";
export type LinkContext = {
  token?: string;
  company: string;
  story?: string;
  platform?: string;
  placement?: Placement;
  published?: string; // originating story publish date, ISO
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function contextFromSearchParams(sp: SP): LinkContext {
  const placement = one(sp.placement);
  return {
    token: one(sp.t),
    company: one(sp.company) ?? "example-co",
    story: one(sp.story),
    platform: one(sp.platform),
    placement: placement === "in_section" ? "in_section" : placement === "standard_block" ? "standard_block" : undefined,
    published: one(sp.published),
  };
}

/** Stub. Without a valid token the visitor is a retail user and gets redirected. */
export function hasValidToken(ctx: LinkContext): boolean {
  return PREVIEW || !!ctx.token;
}

/** Append the full context to any internal or external child URL. */
export function withContext(href: string, ctx: LinkContext): string {
  const isAbs = /^https?:\/\//i.test(href);
  const u = new URL(href, "http://x.local");
  const set = (k: string, v?: string) => v && u.searchParams.set(k, v);
  set("t", ctx.token);
  set("company", ctx.company);
  set("story", ctx.story);
  set("platform", ctx.platform);
  set("placement", ctx.placement);
  set("published", ctx.published);
  return isAbs ? u.toString() : u.pathname + u.search + u.hash;
}
