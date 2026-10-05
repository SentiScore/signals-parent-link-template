import { notFound, redirect } from "next/navigation";
import { Brand } from "@/components/Brand";
import { SITE_URL } from "@/config/site";
import { getCompany, getParentBySlug, resolveParent } from "@/lib/content";
import { contextFromSearchParams, hasValidToken, withContext } from "@/lib/context";

type Props = { params: Promise<{ parent: string; child: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

/**
 * STUB. The child page template is a separate piece of work. It exists so child links resolve
 * and you can see the inherited context arriving. Replace the body with the real child template.
 */
export default async function ChildStub({ params, searchParams }: Props) {
  const ctx = contextFromSearchParams(await searchParams);
  if (!hasValidToken(ctx)) redirect(SITE_URL);
  const { parent: ps, child: cs } = await params;
  const base = getParentBySlug(ps);
  if (!base) notFound();
  const parent = resolveParent(base, ctx.company);
  const child = parent.children.find((c) => c.slug === cs);
  if (!child) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <header className="border-b border-line pb-4"><Brand /></header>
      <main className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">{getCompany(ctx.company).name} · {parent.title}</p>
        <h1 className="serif mt-2 text-4xl">{child.title}</h1>
        <p className="mt-4 text-muted">Child page template goes here (not part of this handoff).</p>
        <pre className="mt-6 overflow-x-auto rounded-xl border border-line bg-card p-4 text-xs">{JSON.stringify(ctx, null, 2)}</pre>
        <a className="mt-6 inline-block text-sm text-accent-2 underline underline-offset-4" href={withContext(`/signals/${parent.slug}`, ctx)}>← Back to {parent.title}</a>
      </main>
    </div>
  );
}
