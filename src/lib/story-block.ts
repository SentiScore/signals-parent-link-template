import { STORY_BLOCK } from "@/config/site";
import { fill, getCompany, liveParents } from "@/lib/content";
import { withContext, type LinkContext } from "@/lib/context";

/**
 * The standard link block for stories and reports, branded Greenwich Research News Data:
 * a heading plus one line per live parent, same order every time.
 * TODO(dev): production links are minted per story/topic/company/platform/placement by the
 * link service; this shows the shape (heading, title, line, href) the story templates consume.
 */
export function storyBlock(ctx: LinkContext) {
  return {
    heading: fill(STORY_BLOCK.heading, getCompany(ctx.company).name),
    items: liveParents().map((p) => ({
      title: p.title,
      line: p.storyLine + STORY_BLOCK.lineSuffix,
      href: withContext(`/signals/${p.slug}`, { ...ctx, placement: "standard_block" }),
    })),
  };
}
