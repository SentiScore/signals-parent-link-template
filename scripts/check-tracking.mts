/**
 * npm run check:tracking   (replaces the earlier child-link context check)
 *
 * 1. Every live link of every company round-trips: mint -> verify returns the exact context.
 * 2. Forged, tampered and cross-quarter tokens are rejected.
 * 3. Volume: mints and verifies one full quarter for the four DSR products
 *    (66 issues x 50 companies x 11 links x 2 platforms x 4 products = 290,400 links, live project doc)
 *    in memory. Links are stateless, so testing the volume needs no local database at all.
 */
import { source } from "@/content/source";
import { mintToken, PLATFORMS, PRODUCTS, readToken, type LinkContext } from "@/lib/links";

let failures = 0;
const fail = (m: string) => (failures++, console.error(`  ✗ ${m}`));
const same = (a: LinkContext, b: LinkContext | null) => !!b && JSON.stringify(a) === JSON.stringify({ ...b });

console.log("\n1. Round trip, every live link");
const companies = await source.listCompanies();
let n = 0;
for (const c of companies)
  for (const l of c.links)
    for (const product of PRODUCTS)
      for (const platform of PLATFORMS)
        for (const placement of ["block", "in_text"] as const) {
          const ctx: LinkContext = { quarter: "2026q4", product, issue: "check-1", company: c.id, code: l.code, platform, placement };
          if (!same(ctx, readToken(ctx.quarter, mintToken(ctx)))) fail(`${c.id} ${l.code} ${product} ${platform} ${placement}`);
          n++;
        }
const rotation: LinkContext = { quarter: "2026q4", product: "dsr", issue: "check-1", company: "lorem-b", code: "C10", platform: "lseg", placement: "peer_rotation", ref: "lorem-a" };
if (!same(rotation, readToken("2026q4", mintToken(rotation)))) fail("peer rotation link");
console.log(`  ✓ ${n + 1} links`);

console.log("\n2. Rejection");
const base: LinkContext = { quarter: "2026q4", product: "dsr", issue: "check-1", company: "lorem-a", code: "C01", platform: "lexisnexis", placement: "block" };
const t = mintToken(base);
const [payload, sig] = t.split(".");
const swapped = Buffer.from(Buffer.from(payload, "base64url").toString().replace("lorem-a", "lorem-b")).toString("base64url");
const cases: [string, string, string][] = [
  ["tampered payload", "2026q4", `${swapped}.${sig}`],
  ["tampered signature", "2026q4", `${payload}.${sig.slice(0, -2)}AA`],
  ["moved to another quarter", "2027q1", t],
  ["malformed", "2026q4", "not-a-token"],
  ["bad quarter", "2026q5", t],
];
for (const [name, q, tok] of cases) readToken(q, tok) === null ? console.log(`  ✓ ${name}`) : fail(`${name} was accepted`);
for (const bad of [{ ...base, issue: "has space" }, { ...base, placement: "peer_rotation" as const }, { ...base, ref: "lorem-b" }]) {
  try {
    mintToken(bad);
    fail(`invalid context minted: ${JSON.stringify(bad)}`);
  } catch {
    /* expected */
  }
}
console.log("  ✓ invalid contexts refused at mint time");

console.log("\n3. Volume, one quarter of the four DSR products");
const ISSUES = 66, COMPANIES = 50, LINKS = 11;
const codes = ["C01", "C02", "C05", "C07", "C10", "S12", "S13", "S14", "S15", "C01", "C02"] as const;
const started = performance.now();
let total = 0;
let longest = 0;
for (let i = 0; i < ISSUES; i++)
  for (let c = 0; c < COMPANIES; c++)
    for (let l = 0; l < LINKS; l++)
      for (const platform of PLATFORMS)
        for (const product of PRODUCTS) {
          const ctx: LinkContext = { quarter: "2026q4", product, issue: `issue-${i}`, company: `co-${c}`, code: codes[l], platform, placement: "block" };
          const tok = mintToken(ctx);
          longest = Math.max(longest, tok.length);
          if (!readToken("2026q4", tok)) fail(`volume link ${total}`);
          total++;
        }
const ms = performance.now() - started;
console.log(`  ✓ ${total.toLocaleString("en-IN")} links minted and verified in ${(ms / 1000).toFixed(1)}s (${((ms * 1000) / total).toFixed(1)} µs each), longest token ${longest} chars, 0 bytes stored`);

console.log(failures ? `\nFAILED: ${failures}\n` : "\nPASSED\n");
if (failures) process.exit(1);
