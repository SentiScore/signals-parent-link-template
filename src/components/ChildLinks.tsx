import type { ChildContent } from "@/content/types";
import { withContext, type LinkContext } from "@/lib/context";
import { Ph } from "./Ph";
import { TrackedLink } from "./TrackedLink";

/** The main event: 3-5 child links, each a deliberate request for real incremental detail. */
export function ChildLinks({ parentSlug, parentId, items, ctx }: { parentSlug: string; parentId: string; items: ChildContent[]; ctx: LinkContext }) {
  return (
    <section aria-labelledby="go-deeper">
      <h2 id="go-deeper" className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">
        Go deeper
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((c, i) => (
          <li key={c.id} className={items.length % 2 === 1 && i === items.length - 1 ? "sm:col-span-2" : ""}>
            <TrackedLink
              href={withContext(c.href ?? `/signals/${parentSlug}/${c.slug}`, ctx)}
              event={{ event: "child_click", token: ctx.token, company: ctx.company, parent: parentId, child: c.id, placement: ctx.placement, story: ctx.story, published: ctx.published, platform: ctx.platform }}
              className="child-card flex h-full items-start gap-4 rounded-2xl border border-line-strong bg-card p-5"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-2 tnum">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted">{c.title}</span>
                {/* Headline finding, shown up front (value gate: the detail is behind the click). */}
                <Ph as="span" className="tnum mt-1.5 block text-[15px] font-semibold leading-snug text-ink">{c.headline}</Ph>
                {/* The promise: the text the reader decides to click on. */}
                <Ph as="span" className="mt-2 block text-sm leading-relaxed text-accent-2 underline decoration-accent/30 underline-offset-4">{c.promise}</Ph>
              </span>
              <span className="arrow mt-0.5 text-accent-2" aria-hidden>â†’</span>
            </TrackedLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

