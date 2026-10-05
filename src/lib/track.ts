"use client";
/**
 * Event stub for the unified schema (plan Appendix B): parent_open, child_open, crossover_home.
 * TODO(dev): wire to the real event pipeline. Until NEXT_PUBLIC_EVENTS_ENDPOINT is set
 * events are only logged to the console.
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

export function track(e: SignalEvent) {
  const payload = { ...e, ts: new Date().toISOString() };
  const url = process.env.NEXT_PUBLIC_EVENTS_ENDPOINT;
  if (url && typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(url, JSON.stringify(payload));
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[signals]", payload);
  }
}
