/**
 * npm run check:content
 * Reports content status per parent and fails (exit 1) on STRUCTURE errors only.
 * Placeholders are reported, not failed, so the template builds while the analysts work.
 * Pass --strict to also fail on unfilled placeholders (use in CI before go-live).
 */
import { PARENTS } from "../src/content/parents";
import { COMPANIES } from "../src/content/companies";
import { MAX_CHILDREN } from "../src/config/site";
import { isPlaceholder } from "../src/content/helpers";
import { resolveParent } from "../src/lib/content";

const strict = process.argv.includes("--strict");
let errors = 0;
let todo = 0;
const err = (m: string) => { errors++; console.error("  ✗", m); };

const ids = new Set<string>();
for (const base of PARENTS) {
  console.log(`${String(base.order).padStart(2)}. ${base.title}${base.live ? "" : "  [DORMANT]"}`);
  if (ids.has(base.id)) err(`duplicate parent id ${base.id}`);
  ids.add(base.id);
  if (!base.live) continue;
  const p = resolveParent(base, process.env.COMPANY ?? Object.keys(COMPANIES)[0] ?? "example-co");
  if (p.children.length < 1) err("no live children");
  if (p.children.length > MAX_CHILDREN) err(`${p.children.length} live children (max ${MAX_CHILDREN})`);
  const texts: [string, string][] = [["storyLine", p.storyLine], ["promise", p.promise], ["summary.body", p.summary.body], ...p.summary.metrics.map((m): [string, string] => [`metric ${m.label}`, m.value]), ...p.children.map((c): [string, string] => [`child ${c.id}.promise`, c.promise])];
  const open = texts.filter(([, t]) => isPlaceholder(t)).length;
  todo += open;
  const flags = p.children.filter((c) => c.flags?.length).map((c) => `${c.title} (${c.flags!.join(",")})`);
  console.log(`    ${p.children.length} live children · ${open}/${texts.length} placeholders${flags.length ? " · review: " + flags.join("; ") : ""}`);
  const cids = new Set<string>();
  for (const c of p.children) { if (cids.has(c.id)) err(`duplicate child id ${c.id}`); cids.add(c.id); }
}
console.log(`\n${PARENTS.filter((p) => p.live).length} live parents · ${todo} placeholders remaining · ${errors} errors`);
if (errors || (strict && todo)) process.exit(1);
