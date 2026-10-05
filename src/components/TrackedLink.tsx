"use client";
import { useEffect } from "react";
import { track, type SignalEvent } from "@/lib/track";

export function TrackedLink({
  href,
  event,
  external,
  className,
  children,
}: {
  href: string;
  event: SignalEvent;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Fires parent_open once when the landing page renders. */
export function ParentOpenTracker({ event }: { event: SignalEvent }) {
  useEffect(() => {
    track(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
