import { liveParents } from "@/lib/content";
import { withContext, type LinkContext } from "@/lib/context";

/**
 * The standard link block for stories and reports: one line per live parent, same order every time.
 * TODO(dev): production links are minted per story/topic/company/platform/placement by the
 * link service; this only shows the shape (title, line, href) the story templates consume.
 */
export function storyBlock(ctx: LinkContext) {
  return liveParents().map((p) => ({
    title: p.title,
    line: p.storyLine,
    href: withContext(`/signals/${p.slug}`, { ...ctx, placement: "standard_block" }),
  }));
}
