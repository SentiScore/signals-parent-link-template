import { NextResponse, type NextRequest } from "next/server";
import { SD_URL } from "@/config/site";
import { isQuarter, readToken } from "@/lib/links";

/**
 * Gate for every URL except the gallery, the API and static files.
 *   /{quarter}/{token}[/sd]  -> valid signed token: through; anything else: 307 to the public site
 *                               (consolidated plan §3.5). One HMAC, no lookup.
 *   any other path           -> a real 404, never a streamed page.
 */
export function proxy(request: NextRequest) {
  const [quarter, token] = request.nextUrl.pathname.split("/").filter(Boolean);
  if (!quarter) return NextResponse.next(); // gallery (itself preview-only)
  if (!isQuarter(quarter)) return new NextResponse("Not found", { status: 404 });

  let valid = false;
  try {
    valid = !!token && !!readToken(quarter, token);
  } catch (err) {
    // Misconfiguration (LINK_SECRET missing in production): fail closed, never 500 to a reader.
    console.error("[proxy] cannot verify links:", (err as Error).message);
  }
  if (valid) return NextResponse.next();
  const res = NextResponse.redirect(SD_URL, 307);
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|brand/|robots.txt|favicon.ico).*)"],
};
