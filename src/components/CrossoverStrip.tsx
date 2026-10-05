import { CROSSOVER, DESTINATION_NAME, SITE_URL, crossoverUrl } from "@/config/site";
import { fill } from "@/lib/content";
import type { LinkContext } from "@/lib/context";
import { TrackedLink } from "./TrackedLink";

/**
 * The StockDashboard.com invitation. Intentionally quiet: small type, muted surface, no button,
 * placed BELOW the child links, opens in a new tab. It is an optional detour, never a competitor
 * to the child links. Copy lives in content/parents/*.ts (crossover.hook) and config/site.ts.
 */
export function CrossoverStrip({ parentId, hook, cta, company, ctx }: { parentId: string; hook: string; cta?: string; company: string; ctx: LinkContext }) {
  return (
    <aside aria-label={DESTINATION_NAME} className="rounded-2xl border border-dashed border-line-strong bg-cream-2 px-5 py-4">
      <div className="flex items-start gap-3.5">
        <span aria-hidden className="mt-1 h-10 w-1 shrink-0 rounded-full bg-accent/50" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">{CROSSOVER.eyebrow}</p>
          <p className="serif mt-1 text-lg leading-snug text-ink-2">{fill(hook, company)}</p>
          <p className="mt-2 text-sm">
            <TrackedLink
              href={crossoverUrl(parentId)}
              external
              event={{ event: "crossover_home", company: ctx.company, parent: parentId, placement: ctx.placement, story: ctx.story, published: ctx.published, platform: ctx.platform }}
              className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {fill(cta ?? CROSSOVER.cta, company)} <span aria-hidden>↗</span>
            </TrackedLink>
            <span className="ml-2 text-muted-2">{new URL(SITE_URL).host}</span>
          </p>
          <p className="mt-1 text-xs text-muted-2">{CROSSOVER.reassurance}</p>
        </div>
      </div>
    </aside>
  );
}
