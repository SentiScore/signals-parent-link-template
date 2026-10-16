import { NextResponse, type NextRequest } from "next/server";
import { SD_URL } from "@/config/site";
import { isQuarter, readToken } from "@/lib/links";

/**
 * Gate for link URLs (/{quarter}/{token}[/sd]). A request without a valid signed token did not come from
 * a report link, so it gets a real HTTP redirect to the public site before anything renders (consolidated
 * plan §3.5). Verification is one HMAC, no lookup. The page re-reads the token for its context.
 */
export function proxy(request: NextRequest) {
  const [quarter, token] = request.nextUrl.pathname.split("/").filter(Boolean);
  if (!quarter || !isQuarter(quarter)) return NextResponse.next();
  if (token && readToken(quarter, token)) return NextResponse.next();
  const res = NextResponse.redirect(SD_URL, 307);
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|brand/|robots.txt|favicon.ico).*)"],
};
