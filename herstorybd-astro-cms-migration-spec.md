# HerStory BD — Astro + Decap CMS Migration Spec

**Target repo:** `nasif43/her-story-new-site`
**Target branch:** `feat/astro-decap-migration` (create from `main`, do NOT merge to `main`, push to origin when phases are complete)
**Executor:** Antigravity agent
**Author of this spec:** Muhts, with Claude

---

## 0. Ground rules for the agent

- Work only on `feat/astro-decap-migration`. Never commit to `main`.
- Commit after each phase below (not each file). Use the phase name as the commit message prefix, e.g. `phase1: scaffold astro project`.
- After every phase, run the verification checklist for that phase before moving to the next. Do not proceed on a failed check — stop and report what failed.
- Do not delete the existing Vite app (`src/`, `server.ts`, `package.json` at repo root) until Phase 6 is explicitly reached and confirmed working. The old app must stay buildable/runnable throughout Phases 1–5 so it can still be deployed if the migration is paused.
- Prefer raw, verifiable output (build logs, `tsc` output, actual file contents) over summarized claims of success.
- Do not invent content. Every piece of copy currently in `src/data/mockData.ts` and `src/data/translations.ts` must be carried over losslessly — no paraphrasing, no dropped fields.
- Do not fabricate placeholder/demo data anywhere in the new stack. This migration explicitly removes the fake seeded data problem described in Phase 5 — do not reintroduce it.

---

## 1. Goal

Migrate `herstorybd.org` from a client-only Vite + React SPA to **Astro**, with **Decap CMS** as the content-editing layer, so that:

1. Non-developers can edit existing page content and create new pages without a code change or developer involvement.
2. Both EN and BN content are structured, schema-validated, and can't silently drift out of sync the way the current flat `translations.ts` dictionary allows.
3. Content pages are statically generated (SSG) for real SEO benefit — full HTML in the initial response, fast Core Web Vitals, real per-language URLs.
4. The existing interactive pieces (shader background, search, modals, motion animation, Project Ladyland's voting flow) keep working, ported as Astro islands with minimal logic changes.
5. The current deployment ambiguity (static `_redirects` vs. persistent Express server) is resolved: this migration standardizes on **static Astro output + Netlify Functions** for the few endpoints that need a server.

This is a full rewrite of the frontend, not an incremental patch. Content storage moves from hardcoded TypeScript to Markdown/JSON files in the repo, edited via a `/admin` UI that commits back via GitHub.

---

## 2. Target stack

- **Astro** (latest stable) with the React integration (`@astrojs/react`) for islands.
- **Astro Content Collections** (`src/content/config.ts`) as the content layer, backed by Markdown/MDX + YAML/JSON frontmatter.
- **Decap CMS** (`decap-cms-app`, formerly Netlify CMS) mounted at `/admin`, authenticated via Netlify Identity + GitHub, or GitHub OAuth via a small Netlify Function if Identity isn't wanted. Decap is fully open-source, self-hosted (content lives in the repo, not a third-party service), free, with no SaaS dependency.
- **Astro's built-in i18n routing** (`astro:i18n`) for `/en/...` and `/bn/...` URL structure.
- **Tailwind v4** (already in use) — keep as-is, port existing utility classes directly.
- **Netlify** as the deploy target — static Astro output + Netlify Functions for the two server-side needs (OAuth token exchange and Sheets writes for Project Ladyland). This replaces `server.ts`/Express entirely.
- Existing dependencies to carry over as-is: `motion`, `lucide-react`, `googleapis` (used only inside the Netlify Function now), `firebase` (only if still needed for the Ladyland OAuth flow — confirm in Phase 4).
- Dependencies to drop: `express`, `@vitejs/plugin-react`, `vite`, `esbuild` (server bundling), `tsx`. `@google/genai` — confirm it's unused (it was unused in the current codebase) and drop it; do not add new usage of it as part of this migration.

---

## 3. Content model

Create `src/content/config.ts` defining these collections. Each collection is locale-split: one entry per item per locale, sharing an `id` (slug) so EN/BN pairs can be joined at render time. Use the directory convention `src/content/<collection>/<locale>/<slug>.md` so Decap's UI can browse folders per language cleanly.

### 3.1 `dreams` — from `DreamItem` in `src/types.ts`

Frontmatter schema (Zod, in `config.ts`):

```
id: string
title: string
category: enum ['Textile Art','Theatre & Performance','Community Space','Fairy Tale & Lore','Publishing','Archive']
description: string
imageUrl: string
bgAccent: string
year: string
location: string (optional)
impactMetrics: string (optional)
tags: string[]
audioExcerptUrl: string (optional)
quote: string (optional)
```
Body content = `fullNarrative` (rendered as Markdown instead of a template-literal string).

### 3.2 `books` — from `BookItem`

```
id: string
title: string
author: string
illustrator: string (optional)
coverImage: string
description: string
year: string
pages: number
genre: enum ['Illustrated Biography','Sci-Fi Classic','Cultural History',"Children's Fiction",'Zine & Anthology']
price: string (optional)
isbn: string (optional)
downloadablePdf: boolean (optional, default false)
```
Body content = `excerptText`.

### 3.3 `sisterLibrary` — from `SisterLibraryItem`

```
id: string
title: string
author: string
category: enum ['Zine','Feminist Theory','Art Book','Poetry','Fiction']
condition: enum ['Available','On Loan','Digital Copy']
coverImage: string
donatedBy: string (optional)
```
Body content = `curatorNote`.

### 3.4 `reflections` — from `ReflectionItem`

```
id: string
title: string
author: string
role: string
date: string
readTime: string
category: enum ['Essay','Podcast Transcripts','Interview','Editorial']
excerpt: string
coverImage: string
```
Body content = `fullContent`.

### 3.5 `pages` — the new generic page-builder collection (this is the actual "create new pages" capability)

```
id: string
slug: string
title: string
status: enum ['draft','published']
blocks: array of:
  {
    type: enum ['hero','text','quote','imageText','itemGrid','gallery','cta']
    // fields below vary by type — Decap uses its "list of typed objects" widget for this
  }
```

Define one block type per entry in the enum, each as its own Zod object with only the fields it needs (e.g. `hero` = `{ heading, subheading, imageUrl }`; `text` = `{ body: markdown }`; `itemGrid` = `{ heading, collectionRef: 'dreams'|'books'|'sisterLibrary'|'reflections', filterTag: string (optional) }`). Keep this to the 5–6 block types actually needed to reconstruct one of the existing simple pages (start with Reflections as the proof case per Phase 3 below) — do not over-engineer additional block types speculatively.

New pages render at `/[locale]/page/[slug]` via a generic `PageRenderer.astro` that switches on `block.type`.

### 3.6 `siteStrings` — replacement for `translations.ts`

Do not carry over the flat 608-key dictionary as-is. Instead:
- UI chrome strings (nav labels, buttons, footer labels — anything that isn't page body content) go into a single `src/content/siteStrings/en.json` and `src/content/siteStrings/bn.json`, each a flat key→string map, schema-validated so a missing key in one locale fails the build (this is the fix for the "EN/BN drift silently" problem).
- Anything that's actually page copy (hero description, section intros) should instead become part of the relevant content collection entry or a `pages` block, not a translation key. Use judgment per string, but bias towards moving real content out of the flat dictionary and into structured content.

---

## 4. Routing & i18n

- Configure `astro.config.mjs` with `i18n: { defaultLocale: 'en', locales: ['en','bn'], routing: { prefixDefaultLocale: true } }` — every route gets an explicit `/en/` or `/bn/` prefix, including the default, for consistency and clean `hreflang` generation.
- Route map (mirrors current tabs, now real static routes):
  - `/[locale]/` → home
  - `/[locale]/dreams` → dreams index + `/[locale]/dreams/[slug]` detail
  - `/[locale]/books` → books index + `/[locale]/books/[slug]` detail
  - `/[locale]/sister-library` → sister library index
  - `/[locale]/reflections` → reflections index + `/[locale]/reflections/[slug]` detail
  - `/[locale]/ladyland` → Project Ladyland (heavy island page, see Phase 4)
  - `/[locale]/page/[slug]` → generic CMS-authored pages (new capability)
- Add a language switcher that maps the current route to its counterpart in the other locale (not just redirect to that locale's homepage).
- Add `<link rel="alternate" hreflang="...">` tags for every page, and a root `/` redirect to `/en/` (or use the browser's `Accept-Language` header if straightforward — don't over-engineer this, a static redirect to `/en/` is acceptable for v1).

---

## 5. Component migration (Astro islands)

Port these existing components with **minimal logic changes** — they should work close to as-is, just wrapped as islands with the appropriate `client:*` directive:

| Component | New home | Hydration |
|---|---|---|
| `ShaderBackground.tsx` | `src/components/islands/ShaderBackground.tsx` | `client:load` (needs to run immediately, it's the background) |
| `Header.tsx` | island (nav state, search trigger) | `client:load` |
| `SearchModal.tsx` | island | `client:idle` |
| `DetailModal.tsx` | island | `client:idle` |
| `OurStoryModal.tsx` | island | `client:idle` |
| `FooterModal.tsx` | island | `client:idle` |
| `ProjectLadylandView.tsx` (1,562 lines) | island, mounted only on the `/ladyland` route | `client:visible` for animation-heavy sections; keep the OAuth/voting logic client-side, but point it at the new Netlify Function endpoints (Phase 4) instead of Express routes |
| `Hero`, `OngoingProgramme`, `MissionSection`, `RealisedDreams`, `AboutHerstory`, `QuoteSection`, `Footer` | convert to `.astro` components where they're pure display (no client state) — check each one; only keep as React islands if they actually need client-side interactivity | static where possible, island only if needed |

Do not attempt to break up `ProjectLadylandView.tsx` into smaller components as part of this migration — that's a separate refactor. Port it whole, just change its data-fetching endpoints.

---

## 6. Server-side: replacing `server.ts`

`server.ts` currently does two unrelated things — serves the SPA (no longer needed, Astro's static output replaces this) and handles Project Ladyland's vote/signup/order endpoints against an in-memory store seeded with **fake placeholder data** (hardcoded fake votes, a fake signup list, a fake order — this was flagged as a real problem, not cosmetic: it serves fabricated numbers to real visitors whenever no real Google Sheet has been created in the current process).

Replace with Netlify Functions:

- `netlify/functions/sheets-vote.ts`, `sheets-signup.ts`, `sheets-order.ts`, `sheets-data.ts` — same request/response shape as the current Express routes (check `server.ts` lines ~52–260 for the existing contract) but:
  - **No in-memory fallback store.** If there's no valid Google Sheets connection configured, return a clear error (e.g. `503 { error: 'sheet not configured' }`) — do not fabricate or return placeholder numbers under any circumstance.
  - Persist the actual spreadsheet ID via a Netlify environment variable (`SHEETS_SPREADSHEET_ID`) set once after the real sheet is created, not regenerated per cold start.
  - Keep the existing `googleapis` OAuth2 + Sheets API append logic — it's sound, just move it out of Express into the function handler.
- Confirm whether `firebase-applet-config.json`'s Google OAuth (used to get Sheets write scope) is still needed client-side for the vote flow, or whether the functions can handle auth server-side entirely. If client OAuth is still required, keep `firebase` as a dependency and port the sign-in flow as part of the Ladyland island; otherwise drop it.

---

## 7. Decap CMS setup

- `public/admin/index.html` — the standard Decap entry point (script tag include, no build step needed for the admin app itself).
- `public/admin/config.yml` — maps each content collection above (dreams, books, sisterLibrary, reflections, pages, siteStrings) to its folder under `src/content/`, with field definitions matching the Zod schemas in `src/content/config.ts` (keep these in sync manually — Decap doesn't read Zod schemas natively).
- Auth: use `backend: { name: git-gateway }` with Netlify Identity if the team is fine with a Netlify-hosted auth layer (simplest to set up), or `backend: { name: github, repo: nasif43/her-story-new-site }` for direct GitHub OAuth if Netlify Identity is undesirable. Default to Netlify Identity for v1 — least setup friction — and note in the PR description that switching to direct GitHub auth later is a config-only change.
- Every collection needs `create: true` (so new dreams/books/pages can be added) except `siteStrings`, which should be `create: false` (fixed key set, only value edits).

---

## 8. Migration phases (do in this order)

**Phase 1 — Scaffold.** New Astro project on the branch, React integration, Tailwind v4 wired up, i18n config. Verify: `astro build` succeeds, produces a blank but running site locally.

**Phase 2 — Content collections + data migration.** Write `src/content/config.ts` for all six collections from §3. Write a one-off Node script (`scripts/migrate-content.ts`, delete after use or keep in `scripts/` for reference — agent's judgment) that reads the existing `src/data/mockData.ts` and `src/data/translations.ts` from the **old** app (still present at repo root until Phase 6) and generates the Markdown/JSON files under `src/content/`. Verify: every item in the old `mockData.ts` has a corresponding file, spot-check 3 items per collection for lossless field transfer, confirm `astro build` validates all frontmatter against the Zod schemas with zero errors.

**Phase 3 — Static content pages.** Build the five content-page routes (home, dreams, books, sister-library, reflections) as Astro pages reading from content collections, plus the generic `pages/[slug]` route and `PageRenderer.astro` with the block types from §3.5. Reconstruct the Reflections page specifically as a CMS-authored `pages` entry as the proof case. Verify: all five pages render with real migrated content in both `/en/` and `/bn/`, `astro build` produces static HTML for each with no client JS required to see content, Lighthouse SEO score sanity-checked locally.

**Phase 4 — Islands + Ladyland.** Port the components from §5, wire Netlify Functions per §6, point the Ladyland voting/signup/order flow at the new functions. Verify: search, modals, shader background, and Ladyland's vote/signup/order flow all work locally against `netlify dev`, and confirm the fake-seed-data fallback is gone (a request with no configured sheet returns the 503, not fabricated numbers).

**Phase 5 — Decap CMS.** Wire up `/admin` per §7. Verify: a real edit made through the Decap UI locally produces a correct git commit with correctly-shaped frontmatter, and a new `pages` entry created through Decap renders correctly via `PageRenderer`.

**Phase 6 — Cutover prep.** Only after Phases 1–5 are verified: remove the old Vite app (`src/` at repo root, `server.ts`, old `package.json` scripts, `vite.config.ts`), promote the Astro project to repo root if it was built in a subdirectory, update `netlify.toml` (or create one) to point at the Astro build output and Netlify Functions directory. Do not delete `public/_redirects` logic without confirming Astro's own routing/redirects cover the same cases. Push final state to `feat/astro-decap-migration` and stop — do not merge to `main`. Leave a summary commit describing what's ready for review.

---

## 9. Explicit non-goals for this migration

- Do not refactor `ProjectLadylandView.tsx` internally.
- Do not add automated tests as part of this work (separate effort).
- Do not add ESLint config (separate effort).
- Do not attempt real-time collaborative editing — Decap's git-based model with async commits is accepted as sufficient for a 2-person editing team.
- Do not build authentication/roles beyond what Netlify Identity or GitHub OAuth provides out of the box.

---

## 10. Final acceptance checklist

- [ ] `feat/astro-decap-migration` branch exists, `main` untouched.
- [ ] `astro build` succeeds with zero errors.
- [ ] All content from `mockData.ts` present and correct in both locales.
- [ ] `/en/` and `/bn/` fully navigable, all six original tabs reachable as real URLs.
- [ ] At least one new page created entirely through Decap (not hand-written) renders correctly.
- [ ] Ladyland vote/signup/order flow works end-to-end against a real (or clearly documented test) Google Sheet, with no fake fallback data anywhere.
- [ ] `/admin` loads Decap CMS and a test edit produces a real commit.
- [ ] No fabricated/placeholder data exists anywhere in the new codebase.
- [ ] Old Vite app fully removed only after all above are confirmed.
