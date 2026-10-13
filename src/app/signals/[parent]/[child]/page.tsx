import { notFound, redirect } from "next/navigation";

import { Brand } from "@/components/Brand";
import { ParentOpenTracker } from "@/components/TrackedLink";

import { SITE_URL } from "@/config/site";

import {
  getCompany,
  getParentBySlug,
  resolveParent,
} from "@/lib/content";

import {
  contextFromSearchParams,
  hasValidToken,
  withContext,
} from "@/lib/context";

type Props = {
  params: Promise<{
    parent: string;
    child: string;
  }>;

  searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

/**
 * Child Research Page
 *
 * Phase 2H:
 * - Preserves inherited tracking context
 * - Resolves parent and child content
 * - Records child_open when the page mounts
 * - Maintains navigation back to the parent
 *
 * NOTE:
 * The child research template is currently a placeholder.
 * Full child research content will be implemented separately.
 */
export default async function ChildPage({
  params,
  searchParams,
}: Props) {
  // 1. Extract tracking context from URL
  const ctx = contextFromSearchParams(await searchParams);

  // 2. Preserve existing preview access behavior.
  // This is NOT production-grade token validation.
  if (!hasValidToken(ctx)) {
    redirect(SITE_URL);
  }

  // 3. Extract route parameters
  const {
    parent: parentSlug,
    child: childSlug,
  } = await params;

  // 4. Resolve parent
  const base = getParentBySlug(parentSlug);

  if (!base || !base.live) {
    notFound();
  }

  // 5. Resolve company-specific parent content
  const parent = resolveParent(base, ctx.company);

  // 6. Find the requested child
  const child = parent.children.find(
    (item) => item.slug === childSlug
  );

  if (!child) {
    notFound();
  }

  // 7. Resolve company
  const company = getCompany(ctx.company);

  // 8. Render child research page
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">

      {/* Track actual child-page mount */}
      <ParentOpenTracker
        event={{
          event: "child_open",
          token: ctx.token,
          company: ctx.company,
          parent: parent.id,
          child: child.id,
          placement: ctx.placement,
          story: ctx.story,
          published: ctx.published,
          platform: ctx.platform,
        }}
      />

      {/* Header */}
      <header className="border-b border-line pb-4">
        <Brand />
      </header>

      {/* Main content */}
      <main className="mt-8">

        {/* Company and parent */}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">
          {company.name} · {parent.title}
        </p>

        {/* Child title */}
        <h1 className="serif mt-2 text-4xl">
          {child.title}
        </h1>

        {/* Placeholder content */}
        <p className="mt-4 text-muted">
          Child page template goes here (not part of this handoff).
        </p>

        {/* Development-only tracking context */}
        {process.env.NODE_ENV !== "production" && (
          <pre className="mt-6 overflow-x-auto rounded-xl border border-line bg-card p-4 text-xs">
            {JSON.stringify(ctx, null, 2)}
          </pre>
        )}

        {/* Back to parent */}
        <a
          className="mt-6 inline-block text-sm text-accent-2 underline underline-offset-4"
          href={withContext(
            `/signals/${parent.slug}`,
            ctx
          )}
        >
          ← Back to {parent.title}
        </a>

      </main>
    </div>
  );
}