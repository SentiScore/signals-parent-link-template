"use client";
/**
 * Hit capture for the three events in the plan's unified schema (Appendix B):
 * parent_open, child_open, crossover_home. Every event is sent to BOTH sinks:
 *   1. GA4   - window.gtag, enabled by NEXT_PUBLIC_GA_ID
 *   2. BST-DB - POST to NEXT_PUBLIC_EVENTS_ENDPOINT (sendBeacon)
 * Each parent is tracked individually through the `parent_topic` parameter (and `child_topic`
 * for child clicks), so all 15 parents are separable in both places.
 *
 * TODO(dev): confirm the BST-DB endpoint and payload contract; register the GA4 custom
 * dimensions listed in the README.
 */
export type SignalEvent = {
  event: "parent_open" | "child_open" | "crossover_home";
  company: string;
  parent: string;
  child?: string;
  placement?: string;
  story?: string;
  published?: string;
  platform?: string;
};

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function track(e: SignalEvent) {
  const payload = { ...e, ts: new Date().toISOString() };

  // GA4: flat snake_case params, one event name per type.
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", e.event, {
      parent_topic: e.parent,
      child_topic: e.child,
      company: e.company,
      placement: e.placement,
      story_id: e.story,
      story_published: e.published,
      platform: e.platform,
      transport_type: "beacon",
    });
  }

  // BST-DB
  const url = process.env.NEXT_PUBLIC_EVENTS_ENDPOINT;
  if (url && typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: "application/json" }));
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[signals]", payload);
  }
}
