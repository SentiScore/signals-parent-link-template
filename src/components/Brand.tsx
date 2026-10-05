import { RESEARCH_LABEL, SITE_NAME } from "@/config/site";

/**
 * Header brand lockup. Deliberately NOT a link: the only way out to stockdashboard.com
 * is the quiet crossover strip below the child links, so child links stay the focus.
 */
export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/stockdashboard-logo.png" alt="" width={26} height={26} className="rounded-md" />
      <span className="wordmark">{SITE_NAME}</span>
      <span className="h-3.5 w-px bg-line-strong" aria-hidden />
      <span className="text-xs text-muted">{RESEARCH_LABEL}</span>
    </div>
  );
}
