import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Brand } from "@/components/Brand";
import { BRAND_NAME, PREVIEW } from "@/config/site";
import { CATEGORIES } from "@/content/taxonomy";
import { getPage, listCompanies } from "@/lib/data";
import { pagePath, quarterOf, type LinkContext } from "@/lib/links";

/**
 * Preview gallery (SIGNALS_PREVIEW=1 only). Shows each placeholder company's standard link block as a
 * report would carry it, with freshly minted links, so every template can be opened and reviewed.
 */
export default function Gallery() {
  if (!PREVIEW) notFound();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Brand />
      <h1 className="serif mt-6 text-4xl">Parent page templates</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        C01, C02, C05, C07 and C10, with two company-specific links (S12, S13) showing how an S link reuses its
        cluster&apos;s template. All company content is lorem ipsum. Links below are minted for a preview issue
        of the DSR on LexisNexis; each one opens and records a hit (see <a className="underline" href="/api/hits">/api/hits</a>).
      </p>
      <Suspense>
        <Blocks />
      </Suspense>
    </div>
  );
}

async function Blocks() {
  await connection();
  const quarter = quarterOf(new Date());
  const companies = await listCompanies();
  return (
    <div className="mt-8 space-y-6">
      {await Promise.all(
        companies.map(async (c) => {
          const items = await Promise.all(
            c.links.map(async (l) => {
              const ctx: LinkContext = {
                quarter,
                product: "dsr",
                issue: "preview",
                company: c.id,
                code: l.code,
                platform: "lexisnexis",
                placement: "block",
              };
              return { ...l, promise: (await getPage(c.id, l.code))?.promise ?? "", href: pagePath(ctx) };
            }),
          );
          return (
            <section key={c.id} className="rounded-xl border border-line bg-card p-5">
              <p className="text-sm font-semibold">
                {BRAND_NAME}: go deeper on {c.name}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {items.map((i) => (
                  <li key={i.code} className="grid grid-cols-[3.25rem_1fr] gap-2">
                    <span className="tnum text-xs leading-6 text-muted-2">{i.code}</span>
                    <span>
                      <a className="text-accent-2 underline decoration-accent/40 underline-offset-4 hover:decoration-accent" href={i.href}>
                        {i.promise}
                      </a>
                      <span className="ml-2 text-xs text-muted-2">
                        {CATEGORIES[i.template].title}
                        {i.code !== i.template && ` template (${CATEGORIES[i.template].cluster})`}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        }),
      )}
    </div>
  );
}
