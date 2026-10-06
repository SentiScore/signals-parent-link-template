import { NextRequest, NextResponse } from "next/server";

type SignalEvent = {
  event: "parent_open" | "child_open" | "crossover_home";
  company: string;
  parent: string;
  child?: string;
  placement?: string;
  story?: string;
  published?: string;
  platform?: string;
  ts?: string;
  session_id?: string;
};

type CapturedEvent = SignalEvent & {
  capturedAt: string;
};

const globalStore = globalThis as typeof globalThis & {
  __signalTestEvents?: CapturedEvent[];
};

const events =
  globalStore.__signalTestEvents ??
  (globalStore.__signalTestEvents = []);

export async function POST(request: NextRequest) {
  try {
    const event = (await request.json()) as SignalEvent;

    if (!event.event || !event.company || !event.parent) {
      return NextResponse.json(
        { ok: false, error: "Missing required event fields" },
        { status: 400 }
      );
    }

    const captured: CapturedEvent = {
      ...event,
      capturedAt: new Date().toISOString(),
    };

    events.push(captured);

    console.log(
  `[signals:test] ${captured.event} | ${captured.company} | ${captured.parent}` +
    `${captured.child ? ` | ${captured.child}` : ""}` +
    ` | session=${captured.session_id ?? "-"}`
);

    return NextResponse.json({
      ok: true,
      mode: "test",
      capturedAt: captured.capturedAt,
      totalEvents: events.length,
    });
  } catch (error) {
    console.error("[signals:test] capture failed:", error);

    return NextResponse.json(
      { ok: false, error: "Invalid event payload" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const parentOpens = events.filter(
    (event) => event.event === "parent_open"
  ).length;

  const childOpens = events.filter(
    (event) => event.event === "child_open"
  ).length;

  const crossoverHome = events.filter(
    (event) => event.event === "crossover_home"
  ).length;

  return NextResponse.json({
    mode: "test",
    databaseConnected: false,
    summary: {
      totalEvents: events.length,
      parentOpens,
      childOpens,
      crossoverHome,
    },
    events,
  });
}