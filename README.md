# Signals parent-link template

One reusable, StockDashboard-branded **parent landing page** template for all 15 parent links in the
Readership Attention Signal structure (Kickoff v3 and the Consolidated Signal Platform plan, Appendix A).
All copy, figures, tables and links are **lorem ipsum placeholders**. The structure is the deliverable.

Stack matches `stock-dashboard-web-app`: Next 16, React 19, Tailwind v4, Inter / Instrument Serif / JetBrains Mono,
same colour tokens (light and dark). This repo is standalone: nothing here touches the StockDashboard repo.

```bash
npm install
cp .env.example .env.local     # SIGNALS_PREVIEW=1 for local review
npm run dev                    # http://localhost:3300  (gallery of all parents)
npm run check:content          # structure errors + placeholder count per parent
npm run check:content -- --strict   # also fail on unfilled placeholders (CI before go-live)
```

## Page structure (same for every parent)

Per kickoff v3 §3.4 and §3.5: **promise → summary with real figures → one table or chart → 3-5 child links → quiet StockDashboard strip.**

| Block | Source field | Notes |
|---|---|---|
| Title and one-sentence promise | `title`, `promise` | Be specific: "See the year-by-year maturity schedule" |
| Summary (metrics + paragraph) | `summary.metrics`, `summary.body` | Must carry real content, not just a menu |
| One table or chart | `visual` (`table()` or `chart()`) | Content we already produce |
| Child links (3-5) | `children[]` | The focus of the page. Each child has a promise and `href` |
| StockDashboard strip | `crossover.hook` | Optional detour, see below |

### How the StockDashboard branding stays out of the way of the child links
- The header wordmark is **not a link**. The only way to stockdashboard.com is the strip.
- The strip sits **below** the child links, small type, muted dashed surface, text link (not a button), opens in a **new tab**, and says "Optional detour" / "Free to explore".
- Hook copy is per parent (`crossover.hook`) and uses `{company}`. Shared wording is in `src/config/site.ts` (`CROSSOVER`).
- Clicking it fires `crossover_home` (the crossover metric in the plan). The URL carries UTM params only, never the link token.

## Replacing content and links (the common tasks)

| I want to... | Edit |
|---|---|
| Write a parent's promise, summary, table or chart | `src/content/parents/NN-<parent>.ts` |
| Write a child's one-sentence promise | the `child(...)` entry in that file (`promise`) |
| Point a child at a real destination | set `href` on the child (omit to use the built-in `/signals/<parent>/<child>` route) |
| Take a child or whole parent offline (dormant) | `live: false` on the child or parent |
| Rename a parent or child | change `title`. The topic `id` is derived from the title, so **set `id` explicitly before renaming once live** |
| Drop or merge a parent (e.g. 15 to 14) | `live: false` on it. It leaves the link block and the page |
| Company-specific content, sector KPI | add `src/content/companies/<company>.ts` (see `example.ts`) and register it in `companies/index.ts` |
| Story link-block headline | `storyLine` |
| Brand name, label, crossover URL and copy, preview mode | `src/config/site.ts` |

Placeholders are any text starting `Lorem ipsum`. In preview mode they get a dashed outline so unfilled spots are obvious,
and `npm run check:content` counts them. Child `hint` fields hold the kickoff v3 "detail unlocked" text as analyst reference and are never rendered.
Child `flags` (`check`, `watch`) carry the kickoff review status and appear in `check:content` output.

Company overrides merge over the parent defaults: objects merge, arrays (metrics, table rows) are replaced whole, children are matched by `id`.

## Link context and tracking (kickoff v3 §9)

- Landing URL: `/signals/<parent-slug>?t=<token>&company=…&story=…&platform=…&placement=standard_block|in_section&published=YYYY-MM-DD`
- Every child link inherits the full context via `withContext()` (`src/lib/context.ts`).
- Hidden page: `noindex` meta, `X-Robots-Tag`, `robots.txt` disallow, no sitemap, gallery disabled outside preview.
- Events (`src/lib/track.ts`): `parent_open`, `child_open`, `crossover_home`, matching Appendix B of the plan.
- `src/lib/story-block.ts` shows the shape of the standard story link block (one line per live parent, fixed order).

## What is stubbed (for Suryansh)

1. `hasValidToken` in `src/lib/context.ts`: token verification. No valid token redirects to `SITE_URL` (retail), as the plan requires. Currently any token passes; `SIGNALS_PREVIEW=1` bypasses it. **Never set in production.**
2. `src/lib/track.ts`: sends to `NEXT_PUBLIC_EVENTS_ENDPOINT` if set, otherwise console only. Bot and suspect flags, event-window tags and session IDs are server-side.
3. `src/app/signals/[parent]/[child]/page.tsx`: child page **stub** so links resolve. The child template is separate work.
4. Link minting (new link per story, topic, company, platform, placement), content loading per company (currently code files), and the footer disclaimer.

## Notes

- Kickoff v3 lists **15** parents (the 15th is News & Stock Buzz). All 15 are included; set `live: false` on any to run with fewer.
- Parent and child names, order and the "detail unlocked" hints come from Kickoff v3 §4-§5 and are subject to analyst review.
