import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the content agent (pillar 1) after it writes a company's pages:
 *   POST /api/revalidate  { "company": "aapl" }   with header  x-revalidate-secret: <REVALIDATE_SECRET>
 * Drops that company's cached pages so the next hit renders fresh content. Links are unaffected.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { company } = (await request.json().catch(() => ({}))) as { company?: string };
  if (!company || !/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(company)) {
    return NextResponse.json({ ok: false, error: "company required" }, { status: 400 });
  }
  revalidateTag(`company:${company}`, "max");
  return NextResponse.json({ ok: true, company });
}
