import { STORY_BLOCK } from "@/config/site";
import { fill, getCompany, liveParents, resolveParent } from "@/lib/content";
import { withContext, type LinkContext } from "@/lib/context";

/**
 * The standard link block for reports (kickoff v3 §3.2): a Greenwich-branded heading, then one line
 * per live parent in a fixed order, "<title>: <promise>". The promise is the hyperlinked text, i.e.
 * what the reader decides to click on (kickoff v3 §10).
 * TODO(dev): production links are minted per story/topic/company/platform/placement by the
 * link service; this shows the shape (heading, title, promise, href) the report templates consume.
 */
export function storyBlock(ctx: LinkContext) {
  return {
    heading: fill(STORY_BLOCK.heading, getCompany(ctx.company).name),
    items: liveParents().map((base) => {
      const p = resolveParent(base, ctx.company);
      return {
        title: p.title,
        promise: p.promise,
        href: withContext(`/signals/${p.slug}`, { ...ctx, placement: "standard_block" }),
      };
    }),
  };
}

/** Plain HTML of the block, for report templates that take an HTML snippet. */
export function storyBlockHtml(ctx: LinkContext, absoluteBase: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const b = storyBlock(ctx);
  const lines = b.items
    .map((i) => `<li><strong>${esc(i.title)}:</strong> <a href="${esc(absoluteBase + i.href)}">${esc(i.promise)}</a></li>`)
    .join("");
  return `<div class="greenwich-link-block"><p><strong>${esc(b.heading)}</strong></p><ul>${lines}</ul></div>`;
}
