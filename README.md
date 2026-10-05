# Signals parent-link template (Greenwich Research News Data)

One reusable **parent landing page** template for all **15 parent links** of the Readership Attention Signal
(Kickoff v3 and the Consolidated Signal Platform plan, Appendix A). Every page is branded
**Greenwich Research News Data**. All copy, figures, tables and links are **lorem ipsum placeholders**.
The structure is the deliverable; the analyst team will supply the real content.

Stack matches `stock-dashboard-web-app` (Next 16, React 19, Tailwind v4) so it can be hosted there or
alongside it. This repo is standalone and does not modify the StockDashboard repo.

```bash
npm install
cp .env.example .env.local          # SIGNALS_PREVIEW=1 for local review
npm run dev                         # http://localhost:3300  (gallery of all 15 parents)
npm run check:content               # structure errors + placeholders left, per parent
npm run check:content -- --strict   # also fail on unfilled placeholders (use as a pre-go-live gate)
```

---

## Suryansh: what you need to do, end to end

Three jobs. Everything else is already built.

### Job 1. Replace the placeholder content (when analysts deliver)

One file per parent: `src/content/parents/NN-<parent>.ts` (15 files). Each holds the same fields, so the work is identical 15 times:

| Field | What the analysts provide |
|---|---|
| `storyLine` | Short headline used in the story link block |
| `promise` | One specific sentence: what the reader gets by clicking |
| `summary.metrics[]` | Headline figures (labels are already set; replace the `value`s) |
| `summary.body` | 2-3 sentence summary. Must carry real content |
| `visual` | The ONE table or chart we already produce (`table()` / `chart()` helpers) |
| `children[].promise` | One sentence per child link |
| `crossover.hook` | Optional-detour copy for the strip (a draft is already written) |

Rules from the kickoff doc, enforced by `npm run check:content`: 1-5 live children per parent, no duplicate ids.
Child `hint` fields hold the kickoff "detail unlocked" text as analyst reference (never rendered).
Child `flags` (`check`, `watch`) are the kickoff review statuses and print in the check output.

Content differs per company? Add `src/content/companies/<company>.ts` (copy `example.ts`) and register it in `companies/index.ts`.
It deep-merges over the parent defaults (objects merge, arrays such as metrics and table rows are replaced whole, children match by `id`).
The sector KPI child (Business Performance) is a per-company title override, shown in `example.ts`.

Dormant rule: if analysts can't fill a link, set `live: false` on that child or parent. It disappears from the page and the story block.
**Set an explicit `id` before renaming any live parent or child**, otherwise the logged topic id changes and breaks the time series.

### Job 2. Attach child links to their parent

Every child already sits under its correct parent in the parent file (structure per Kickoff v3 §4/§5). Each child resolves to:

- the built-in route `/signals/<parent-slug>/<child-slug>` by default (currently a **stub** page, see below), or
- any destination you set with `href` on that child (child page, or an external or internal URL once the child template/content exists).

Whatever the destination, `withContext()` (`src/lib/context.ts`) appends the parent's context so the child click traces back
to where the reader started: `t` (token), `company`, `story`, `platform`, `placement`, `published`. Do not bypass it.
Build the real child page template at `src/app/signals/[parent]/[child]/page.tsx` (replace the stub body) and read the context from `searchParams`.

### Job 3. Hit capture on all 15 parents, tracked individually in GA4 and BST-DB

`src/lib/track.ts` already defines and fires three events from the shared components, so **all 15 parents are instrumented by the one template**.
Nothing to copy per parent. What you must wire:

| Event | Fires when | Component |
|---|---|---|
| `parent_open` | landing page renders | `ParentOpenTracker` |
| `child_open` | a child link is clicked | `ChildLinks` |
| `crossover_home` | the optional Stock Dashboard link is clicked | `CrossoverStrip` |

Each event is sent to **both** sinks:

1. **GA4.** Set `NEXT_PUBLIC_GA_ID`. Page views are off by design; GA receives only the three events with params
   `parent_topic`, `child_topic`, `company`, `placement`, `story_id`, `story_published`, `platform`.
   Each parent is separable by `parent_topic` (15 values, e.g. `debt_refinancing`) and each child by `child_topic`.
   Register these as **event-scoped custom dimensions** in GA4 Admin, otherwise they won't appear in reports.
2. **BST-DB.** Set `NEXT_PUBLIC_EVENTS_ENDPOINT`. Events are `POST`ed as JSON (`sendBeacon`) with `event, company, parent, child, placement, story, published, platform, ts`
   (matches Appendix B of the plan). Confirm the final contract with the BST-DB owner. Bot flag, suspect flag, session id and
   event-window tag are **server-side** per the kickoff doc §9, add them at ingestion.

Verify: open each of the 15 pages from the gallery with the dev console open (events log as `[signals]` when no endpoint is set),
then check GA4 DebugView and a row in BST-DB per event type.

### Also needed before production (all small, all marked `TODO(dev)`)

1. **Token verification**: `hasValidToken` in `src/lib/context.ts`. Today any token passes. No valid token must redirect to the public site (already coded).
2. **Link minting**: a new link per story, topic, company, platform and placement (kickoff §9). `src/lib/story-block.ts` shows the shape the story templates consume (branded heading + one line per live parent, fixed order).
3. **Redeploy with `SIGNALS_PREVIEW` unset** (it bypasses the token and enables the gallery). Never set it in production.
4. Footer disclaimer and last-refreshed date text (`ParentLanding.tsx`).

---

## Pages are static per company, never per story or report type

The same 15 links are reused across products, so the page body must be identical whichever report or story the reader came from.
Nothing on the page is derived from the story, report type, platform or publish date. Those values (`story`, `platform`, `placement`, `published`)
are carried in the URL **for tracking only** (kickoff §9) and are never rendered. Content varies only by company (optional overrides). Keep it that way.

## Page structure (same for all 15 parents)

Kickoff v3 §3.4 / §3.5: **promise → summary with real figures → one table or chart → 3-5 child links → quiet optional-detour strip.**
Branding is Greenwich Research News Data (logo header, green and navy palette sampled from the logo). Colours are tokens in `src/app/globals.css`;
logo is `public/brand/greenwich-logo.png`; brand strings are in `src/config/site.ts`.

### The Stock Dashboard strip (does not pull readers away from child links)
- The header logo is **not a link**. The only exit is the strip.
- The strip sits **below** the child links, in small muted type, as a text link (not a button), opens in a **new tab**, and says "Optional detour" and "Free to explore".
- Hook copy is per parent (`crossover.hook`, `{company}` is substituted). Shared wording: `CROSSOVER` in `src/config/site.ts`.
- The link carries UTM params only, never the token, and uses `noopener noreferrer` so the hidden URL is not leaked as a referrer.

## Not discoverable, not indexable

These pages must be reachable only by readers who click a tracked link inside a Greenwich story or report on AlphaSense, LexisNexis, LSEG etc.

| Layer | Where |
|---|---|
| `robots.txt`: `Disallow: /` for all agents, plus named search and AI crawlers | `src/app/robots.ts` |
| `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">` | `src/app/layout.tsx` |
| `X-Robots-Tag` response header on every route | `next.config.ts` |
| No sitemap, no navigation, no internal links to these pages; gallery returns 404 outside preview | by design |
| `referrer: same-origin` so URLs don't leak to other sites | `src/app/layout.tsx` |
| **Token gate**: no valid token redirects to the public site | `src/lib/context.ts` (**you finish this**) |

Note: `robots.txt` is a request, and a crawler that obeys it never sees the `noindex` tag, while a URL pasted publicly can still be listed as a bare link.
The token gate is the real protection, so make tokens unguessable and don't paste live URLs anywhere public.

## Quick reference: "I want to…"

| Task | Edit |
|---|---|
| Write a parent's promise, summary, table or chart | `src/content/parents/NN-<parent>.ts` |
| Write a child promise or set its destination | the `child(...)` entry (`promise`, `href`) |
| Take a child or parent offline | `live: false` |
| Run with fewer than 15 parents | `live: false` on the parent |
| Company-specific content | `src/content/companies/` |
| Brand name, crossover URL and copy, story-block wording | `src/config/site.ts` |

Placeholders are any text starting `Lorem ipsum`. In preview mode they get a dashed outline so unfilled spots are obvious.

## Source of structure
Parents, children, order and hints come from Readership Attention Signal Kickoff v3 (§4, §5) and are subject to analyst review.
