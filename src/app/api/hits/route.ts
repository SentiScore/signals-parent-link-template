import { connection, NextResponse } from "next/server";
import { PREVIEW } from "@/config/site";
import { localHits } from "@/lib/hits";

/**
 * Local hit viewer for development (replaces the earlier /api/events test collector).
 * Shows hits recorded when HITS_ENDPOINT is not set. Disabled outside preview mode.
 */
export async function GET() {
  await connection(); // read at request time, never prerendered
  if (!PREVIEW) return new NextResponse(null, { status: 404 });
  const hits = localHits();
  const count = (key: "kind" | "code" | "company" | "product" | "platform") =>
    hits.reduce<Record<string, number>>((acc, h) => ((acc[h[key]] = (acc[h[key]] ?? 0) + 1), acc), {});
  return NextResponse.json({
    total: hits.length,
    byKind: count("kind"),
    byCode: count("code"),
    byCompany: count("company"),
    byProduct: count("product"),
    byPlatform: count("platform"),
    latest: hits.slice(-50).reverse(),
  });
}
