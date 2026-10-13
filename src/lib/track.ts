"use client";

/**
 * Readership Attention Signal tracking.
 *
 * Events are sent to:
 *   1. GA4, when NEXT_PUBLIC_GA_ID is configured.
 *   2. NEXT_PUBLIC_EVENTS_ENDPOINT using sendBeacon.
 *
 * A browser-session identifier is generated and stored in sessionStorage.
 * It survives navigation within the same tab/session but is not PII.
 */

export type SignalEvent = {
  event:
    | "parent_open"
    | "child_click"
    | "child_open"
    | "crossover_home";

  token?: string;
  company: string;
  parent: string;
  child?: string;
  placement?: string;
  story?: string;
  published?: string;
  platform?: string;
};

type SignalPayload = SignalEvent & {
  ts: string;
  session_id: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const SESSION_KEY = "signals_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);

    if (existing) {
      return existing;
    }

    const id = crypto.randomUUID();

    window.sessionStorage.setItem(SESSION_KEY, id);

    return id;
  } catch {
    // Fallback for environments where sessionStorage is unavailable.
    return crypto.randomUUID();
  }
}

export function track(e: SignalEvent) {
  if (typeof window === "undefined") return;

  const sessionId = getSessionId();

  const payload: SignalPayload = {
    ...e,
    ts: new Date().toISOString(),
    session_id: sessionId,
  };

  // GA4
  if (window.gtag) {
    window.gtag("event", e.event, {
      parent_topic: e.parent,
      child_topic: e.child,
      company: e.company,
      placement: e.placement,
      story_id: e.story,
      story_published: e.published,
      platform: e.platform,
      session_id: sessionId,
      transport_type: "beacon",
    });
  }

  // Event collector / future BST-DB endpoint
  const url = process.env.NEXT_PUBLIC_EVENTS_ENDPOINT;

  if (url && navigator.sendBeacon) {
    navigator.sendBeacon(
      url,
      new Blob(
        [JSON.stringify(payload)],
        { type: "application/json" }
      )
    );
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[signals]", payload);
  }
}