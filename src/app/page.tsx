import { notFound } from "next/navigation";
import { PREVIEW } from "@/config/site";
import { getCompany, liveParents } from "@/lib/content";
import { withContext } from "@/lib/context";
import { storyBlock } from "@/lib/story-block";

/** Dev-only gallery of all parents so every page can be reviewed. Disabled outside preview. */
export default function Gallery() {
  if (!PREVIEW) notFound();
  const ctx = { company: "example-co", platform: "nexis", story: "demo-story-1", published: "2026-10-05", placement: "standard_block" as const };
  const parents = liveParents();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="serif text-4xl">Parent link template</h1>
      <p className="mt-2 text-muted">Preview gallery for {getCompany(ctx.company).name}. {parents.length} live parents. Not available in production.</p>
      <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">Landing pages</h2>
      <ol className="mt-3 divide-y divide-line rounded-2xl border border-line bg-card">
        {parents.map((p) => (
          <li key={p.id}>
            <a className="flex items-center justify-between px-5 py-3 hover:bg-cream-2" href={withContext(`/signals/${p.slug}`, ctx)}>
              <span><span className="tnum mr-3 text-muted-2">{String(p.order).padStart(2, "0")}</span>{p.title}</span>
              <span className="text-xs text-muted">{p.children.filter((c) => c.live).length} children →</span>
            </a>
          </li>
        ))}
      </ol>
      <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">Standard link block (shape)</h2>
      <ul className="mt-3 space-y-1 text-sm">
        {storyBlock(ctx).map((l) => (
          <li key={l.href}><a className="underline underline-offset-4" href={l.href}>{l.title}</a>: {l.line}</li>
        ))}
      </ul>
    </div>
  );
}
