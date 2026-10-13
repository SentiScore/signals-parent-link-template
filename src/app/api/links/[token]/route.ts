import { NextResponse } from "next/server";
import { resolveTrackedLink } from "@/lib/link-registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
};

export async function GET(
  _request: Request,
  { params }: Props
) {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.SIGNALS_PREVIEW !== "1"
  ) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  const { token } = await params;
  const link = await resolveTrackedLink(token);

  if (!link) {
    return NextResponse.json(
      { error: "Tracking link not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      mode: "local-preview",
      link,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
