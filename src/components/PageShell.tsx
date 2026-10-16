import type { ReactNode } from "react";
import { PREVIEW, SD_COPY, SD_URL } from "@/config/site";
import { Brand } from "./Brand";
import { GaPageOpen, SdLink, type GaContext } from "./analytics";

/**
 * Frame shared by every parent page: brand header, the template's blocks, then the StockDashboard
 * section (live project doc: every parent page carries one, with its own tracked, dynamic link).
 * The section sits after the six blocks, in small muted type, so it never competes with the exhibit.
 */
export function PageShell({ company, sdHref, ga, children }: { company: string; sdHref: string; ga: GaContext; children: ReactNode }) {
  const fill = (s: string) => s.replaceAll("{company}", company);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-14 pt-5 sm:px-6">
      <GaPageOpen ctx={ga} />
      <div className="flex items-center justify-between border-b border-line pb-3">
        <Brand />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">{company}</span>
      </div>
      {PREVIEW && (
        <p className="mt-3 rounded-md border border-dashed border-accent/50 bg-accent-soft px-3 py-1.5 text-xs text-accent-2">
          Preview: every company-specific value on this page is lorem ipsum or an illustrative placeholder.
        </p>
      )}

      <main className="mt-6 space-y-7">{children}</main>

      <aside aria-label={SD_COPY.eyebrow} className="mt-10 rounded-xl border border-dashed border-line-strong bg-cream-2 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">{SD_COPY.eyebrow}</p>
        <p className="serif mt-1 text-lg leading-snug text-ink-2">{fill(SD_COPY.hook)}</p>
        <p className="mt-2 text-sm">
          <SdLink href={sdHref} ctx={ga} className="font-medium text-accent-2 underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
            {fill(SD_COPY.cta)} <span aria-hidden>↗</span>
          </SdLink>
          <span className="ml-2 text-muted-2">{new URL(SD_URL).host}</span>
        </p>
        <p className="mt-1 text-xs text-muted-2">{SD_COPY.reassurance}</p>
      </aside>
    </div>
  );
}
