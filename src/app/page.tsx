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
  const block = storyBlock(ctx);
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
      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">How the parent links appear inside a report</h2>
      <p className="mt-1 text-sm text-muted">The standard link block. The hyperlinked text is each parent&apos;s promise; that is what readers decide to click on.</p>
      <div className="mt-3 rounded-2xl border border-line bg-card p-5 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/greenwich-logo.png" alt="Greenwich Research News Data" width={110} height={44} className="h-9 w-auto" />
        <p className="mt-3 text-sm font-semibold">{block.heading}</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
          {block.items.map((l) => (
            <li key={l.href}>
              <span className="font-semibold">{l.title}:</span>{" "}
              <a className="text-accent-2 underline decoration-accent/40 underline-offset-4 hover:decoration-accent" href={l.href}>{l.promise}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
