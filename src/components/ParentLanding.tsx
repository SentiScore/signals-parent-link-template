import type { LinkContext } from "@/lib/context";
import type { ParentContent } from "@/content/types";
import { Brand } from "./Brand";
import { ChildLinks } from "./ChildLinks";
import { CrossoverStrip } from "./CrossoverStrip";
import { Ph } from "./Ph";
import { ParentOpenTracker } from "./TrackedLink";
import { Visual } from "./Visual";

/**
 * THE template. One layout for all 15 parents; only the content object changes.
 * Order (kickoff v3 §3.4): summary (fulfils the parent promise the reader clicked) → one table/chart
 * → 3-5 child links → quiet Stock Dashboard strip.
 * The parent promise itself is the link text in the report, so it is not repeated here.
 */
export function ParentLanding({ parent, companyName, ctx }: { parent: ParentContent; companyName: string; ctx: LinkContext }) {
  const hasPeers = !!parent.peerLinks?.length;
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
<ParentOpenTracker
  event={{
    event: "parent_open",
    token: ctx.token,
    company: ctx.company,
    parent: parent.id,
    placement: ctx.placement,
    story: ctx.story,
    published: ctx.published,
    platform: ctx.platform,
  }}
/>
      <header className="border-b border-line pb-4">
        <Brand />
      </header>

      <main className="mt-8 space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">{companyName}</p>
          <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">{parent.title}</h1>
        </div>

        <section aria-label="Summary" className="rounded-2xl border border-line bg-card p-5 sm:p-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {parent.summary.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-muted">{m.label}</dt>
                <dd className="tnum mt-1 text-lg font-semibold"><Ph>{m.value}</Ph></dd>
                {m.note && <dd className="text-xs text-muted-2">{m.note}</dd>}
              </div>
            ))}
          </dl>
          <Ph as="p" className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-2">{parent.summary.body}</Ph>
        </section>

        <Visual visual={parent.visual} />

        {hasPeers && (
          <nav aria-label="Peers" className="flex flex-wrap gap-2">
            {parent.peerLinks!.map((p) => (
              <a key={p.href} href={p.href} className="rounded-full border border-line-strong px-3 py-1 text-sm hover:border-accent">{p.label}</a>
            ))}
          </nav>
        )}

        <ChildLinks parentSlug={parent.slug} parentId={parent.id} items={parent.children} ctx={ctx} />

        <CrossoverStrip parentId={parent.id} hook={parent.crossover.hook} cta={parent.crossover.cta} company={companyName} ctx={ctx} />
      </main>

      <footer className="mt-10 border-t border-line pt-4 text-xs text-muted-2">
        <Ph>Lorem ipsum dolor sit amet, disclaimer and last refreshed date go here.</Ph>
      </footer>
    </div>
  );
}
