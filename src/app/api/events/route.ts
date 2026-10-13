import { NextRequest, NextResponse } from "next/server";
import { resolveTrackedLink } from "@/lib/link-registry";
import { getParentBySlug, resolveParent } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EventType =
  | "parent_open"
  | "child_click"
  | "child_open"
  | "crossover_home";

type IncomingEvent = {
  event?: EventType;
  token?: string;
  company?: string;
  parent?: string;
  child?: string;
  session_id?: string;
  ts?: string;
};

type CapturedEvent = {
  event: EventType;
  linkId: string;
  token: string;
  productId: string;
  companyId: string;
  clientId: string;
  deliveryId: string;
  storyId: string;
  parentId: string;
  childId?: string;
  reportDate: string;
  platform: string;
  placement: string;
  sessionId: string;
  clientTimestamp?: string;
  capturedAt: string;
};

const globalStore = globalThis as typeof globalThis & {
  __signalAttributedEvents?: CapturedEvent[];
};

const events =
  globalStore.__signalAttributedEvents ??
  (globalStore.__signalAttributedEvents = []);

const allowedEvents = new Set<EventType>([
  "parent_open",
  "child_click",
  "child_open",
  "crossover_home",
]);

function isLocalPreview(request: NextRequest): boolean {
  const hostname = request.nextUrl.hostname;

  return (
    process.env.NODE_ENV !== "production" &&
    process.env.SIGNALS_PREVIEW === "1" &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  );
}

export async function POST(request: NextRequest) {
  if (!isLocalPreview(request)) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  let body: IncomingEvent;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (
    !body ||
    !body.event ||
    !allowedEvents.has(body.event) ||
    typeof body.token !== "string" ||
    !body.token ||
    typeof body.parent !== "string" ||
    typeof body.session_id !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid tracking event" },
      { status: 400 }
    );
  }

  const link = await resolveTrackedLink(body.token);

  if (!link) {
    return NextResponse.json(
      { error: "Unknown tracking token" },
      { status: 404 }
    );
  }

  const parent = getParentBySlug(link.parentSlug);

  if (!parent || !parent.live) {
    return NextResponse.json(
      { error: "Invalid parent" },
      { status: 400 }
    );
  }

  // A link is authorized only for its originating parent topic.
  if (body.parent !== parent.id) {
    return NextResponse.json(
      { error: "Parent does not match tracking token" },
      { status: 400 }
    );
  }

  let childId: string | undefined;

  if (body.event === "child_click" || body.event === "child_open") {
    if (typeof body.child !== "string") {
      return NextResponse.json(
        { error: "Child topic required" },
        { status: 400 }
      );
    }

    const resolvedParent = resolveParent(parent, link.companyId);

    const child = resolvedParent.children.find(
      (candidate) => candidate.id === body.child
    );

    if (!child) {
      return NextResponse.json(
        { error: "Invalid child topic" },
        { status: 400 }
      );
    }

    childId = child.id;
  }

  const captured: CapturedEvent = {
    event: body.event,
    linkId: link.id,
    token: link.token,
    productId: link.productId,
    companyId: link.companyId,
    clientId: link.clientId,
    deliveryId: link.deliveryId,
    storyId: link.storyId,
    parentId: parent.id,
    childId,
    reportDate: link.reportDate,
    platform: link.platform,
    placement: link.placement,
    sessionId: body.session_id,
    clientTimestamp: body.ts,
    capturedAt: new Date().toISOString(),
  };

  events.push(captured);

  console.log(
    `[signals:attributed] ${captured.event}` +
    ` | ${captured.productId}` +
    ` | ${captured.companyId}` +
    ` | ${captured.clientId}` +
    ` | ${captured.parentId}` +
    ` | ${captured.childId ?? "-"}`
  );

  return NextResponse.json({
    ok: true,
    mode: "local-attributed-preview",
    eventId: events.length,
    capturedAt: captured.capturedAt,
  });
}

export async function GET(request: NextRequest) {
  if (!isLocalPreview(request)) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      mode: "local-attributed-preview",
      databaseConnected: false,
      summary: {
        totalEvents: events.length,
        parentOpens: events.filter(
          (e) => e.event === "parent_open"
        ).length,
        childClicks: events.filter(
          (e) => e.event === "child_click"
        ).length,
        childOpens: events.filter(
          (e) => e.event === "child_open"
        ).length,
        crossoverHome: events.filter(
          (e) => e.event === "crossover_home"
        ).length,
      },
      events,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
