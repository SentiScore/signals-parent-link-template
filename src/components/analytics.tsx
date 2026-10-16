"use client";
/**
 * GA4 mirror of the server-side hits (lib/hits.ts is the record of truth; GA is for dashboards).
 * Enabled when NEXT_PUBLIC_GA_ID is set. Every event carries the full link context, so each company,
 * topic code, product, platform and issue is separable in GA. Register these params as event-scoped
 * custom dimensions in GA4 Admin.
 */
import { useEffect, type ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type GaContext = {
  company: string;
  topic_code: string;
  template: string;
  cluster: string;
  product: string;
  platform: string;
  placement: string;
  issue: string;
  quarter: string;
};

const SESSION_KEY = "signals_session_id";

/** Per-tab session id (not personal data), so GA can group a reader's opens within one visit. */
function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) sessionStorage.setItem(SESSION_KEY, (id = crypto.randomUUID()));
    return id;
  } catch {
    return "unavailable";
  }
}

const send = (event: string, ctx: GaContext) =>
  window.gtag?.("event", event, { ...ctx, session_id: sessionId(), transport_type: "beacon" });

export function GaPageOpen({ ctx }: { ctx: GaContext }) {
  useEffect(() => send("parent_open", ctx), [ctx]);
  return null;
}

/** The StockDashboard link: server-tracked via its own URL, mirrored to GA on click. Opens in a new tab. */
export function SdLink({ href, ctx, className, children }: { href: string; ctx: GaContext; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => send("sd_click", ctx)}>
      {children}
    </a>
  );
}
