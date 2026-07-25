# Definition of Done — adelaideairporttobarossa.com.au

**Stack:** Astro 5 (static) + Cloudflare Worker (`worker/index.ts`) serving `dist/` through the
`ASSETS` binding and handling `POST /api/booking`. Structure, configuration and the booking
Worker mirror the `Barossataxi` project.

**Design:** unchanged from the pre-migration `index.html` ("Tarmac to Vines" naive-premium poster
build) — flat colour blocks, hand-drawn inline SVG, zero raster photography.

**Verification:** every gate marked 🔬 was *measured* in headless Chrome against the site served by
`wrangler dev`, not read off the source. Re-run any time with:

```bash
npm run serve     # terminal 1 — wrangler dev on :8787
npm run audit     # terminal 2 — prints the JSON report the 🔬 gates are read from
```

Last full run: **2026-07-25**, commit at time of migration.

**Status: ✅ MIGRATION-COMPLETE + TECH-SEO-CLEAN — 🚫 LAUNCH-BLOCKED** (see Tier 3).

---

## Tier 1 — Platform migration

| # | Gate | Status | Evidence |
|---|---|---|---|
| P1 | Astro project builds clean | ✅ | `npm run build` → 4 pages, 0 warnings, 0 errors |
| P2 | Routes emitted as flat files, no trailing-slash redirect | ✅ | `build.format:'file'`, `trailingSlash:'never'`; `/privacy` → **200** direct (not 307) |
| P3 | Worker serves assets + booking API | ✅ | `wrangler.toml` `[assets] binding=ASSETS`; `/api/booking` handled, everything else falls through |
| P4 | Booking endpoint validates | 🔬 ✅ | GET → 405; missing fields → 400; bad email → 400; honeypot → 200 no-send; 4th POST/min → 429 |
| P5 | Form wired end-to-end (no stub) | 🔬 ✅ | Browser submit → `fetch('/api/booking')` → success state shown, focus moved to it; server-error path shows the server message and re-enables the button |
| P6 | Secrets not in the repo | ✅ | `SMTP2GO_API_KEY` is a Wrangler secret; `.dev.vars` gitignored; `.dev.vars.example` committed |
| P7 | 404s return a real 404 | 🔬 ✅ | `not_found_handling = "404-page"`; `/nonexistent-page` → **404** + branded page |
| P8 | Legacy artefacts out of the served tree | ✅ | `index-v3.html`, `index-premium.html`, unused Build-A JPEGs moved to `legacy/` |
| P9 | Security + cache headers | 🔬 ✅ | `public/_headers`: nosniff, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; `/_astro/*` immutable 1yr (verified via `curl -I`) |

## Tier 2 — Technical SEO, performance, accessibility

| # | Gate | Status | Evidence (measured) |
|---|---|---|---|
| S1 | One canonical host, absolute canonical on every page | 🔬 ✅ | `https://adelaideairporttobarossa.com.au/`, `/privacy`, `/terms` — all self-canonical, no `www` |
| S2 | Title + meta description within display limits | 🔬 ✅ | Home title 77 chars, description 148 chars; both legal pages unique |
| S3 | Robots directives correct | 🔬 ✅ | Home/legal `index, follow` (+ `max-image-preview:large`); 404 `noindex, follow` **and no canonical** |
| S4 | `robots.txt` + `sitemap.xml` | 🔬 ✅ | Both 200; sitemap lists exactly the 3 indexable URLs, all no-slash, matching the canonicals |
| S5 | No redirect chains on canonical URLs | 🔬 ✅ | `/`, `/privacy`, `/terms` → 200 direct. `/index.html` → 307 `/`; `/privacy/` → 307 `/privacy` (normalisation only) |
| S6 | Valid structured data | 🔬 ✅ | 2 JSON-LD blocks parse: `TravelAgency` (name, url, tel, email, areaServed, opening hours) + `FAQPage` (5 Q&A). Placeholder answers deliberately excluded |
| S7 | Open Graph / Twitter complete, absolute image | 🔬 ✅ | `og:url`, `og:image` absolute; `og-image.jpg` measured **1200×630**; `summary_large_image` |
| S8 | Exactly one `<h1>`, sane outline | 🔬 ✅ | h1=1 on all 4 pages; H2/H3 nesting has no level skips |
| S9 | `lang` + locale | 🔬 ✅ | `lang="en-AU"`, `og:locale=en_AU` |
| S10 | Favicon set complete | 🔬 ✅ | `favicon.ico` (32px), `favicon.svg`, `apple-touch-icon.png` 180×180 — all 200 |
| S11 | Zero horizontal overflow | 🔬 ✅ | `scrollWidth === clientWidth` at 265/275/285/290/295/**305/320**/325/345/360/375/390/414/768/1024/1280/1440/1920 px |
| S12 | No header/hero overlap | 🔬 ✅ | `h1.top > header.bottom` at all tested viewports, all 4 pages |
| S13 | Zero console / network errors | 🔬 ✅ | 0 pageerror, 0 console.error, 0 failed requests across 4 pages × 5 viewports |
| S14 | Text contrast ≥ WCAG AA | 🔬 ✅ | **0 failures / 173 text elements** computed against real rendered backgrounds |
| S15 | Form accessibility | 🔬 ✅ | Every field labelled; invalid submit sets `aria-invalid` on all 6 fields, writes 6 `aria-live` errors, focuses the first bad field |
| S16 | Content survives JS-off | 🔬 ✅ | JS disabled → 10/10 sections, form, 6 FAQ `<details>`, fares and final CTA all present; `js-anim` never applied |
| S17 | `prefers-reduced-motion` respected | 🔬 ✅ | 0 of 57 `.reveal` elements hidden, 0 sections hidden, animation suppressed |
| S18 | Images have alt / decorative SVG labelled | 🔬 ✅ | 0 `<img>` missing alt (page uses inline SVG only); 0 `svg[role=img]` without a label |
| S19 | Page weight and paint | 🔬 ✅ | 41KB HTML + 14KB CSS + 145KB fonts ≈ **0.2MB**, no images; local FCP/LCP 500ms, load 550ms |
| S20 | No third-party JS | ✅ | No analytics/tag manager/library; one inline vanilla script; only Google Fonts is off-origin |

**Known, accepted:** `/privacy/` and `/index.html` answer with a 307 to the canonical form. That is
Cloudflare's asset-server normalisation, nothing links or sitemaps those forms, and no crawlable URL
is behind a redirect.

## Tier 3 — Launch blockers 🚫

Everything below is real-world data or a decision only the business can supply. **Do not go live
until all are cleared.**

| # | Blocker | What is needed |
|---|---|---|
| L1 | **Fabricated testimonials** | The three quotes in "What guests say" (Rebecca H., Sarah & Tom K., Priya N.) are invented samples with a hidden HTML comment saying so. Publishing them is fake social proof. **Replace with real, consented reviews or delete the section.** No `Review`/`AggregateRating` schema has been added, and none may be until the reviews are genuine. |
| L2 | Fares | Three `$AUD [XXX]` placeholders in the fares cards. Note they contradict the estimator, which already quotes $175 / $215 / $275 — reconcile both. |
| L3 | Vehicle spec | `[VEHICLE MAKE / MODEL]` and `[SEATS]` in "The ride" and the fares card. |
| L4 | Payment + cancellation terms | `[PAYMENT METHODS]` and `[CANCELLATION POLICY]` in the FAQ, and the matching `[…]` blocks in `/terms` (payment, waiting time, cancellation). |
| L5 | SMTP2GO secret | `npx wrangler secret put SMTP2GO_API_KEY`, then submit a real booking and confirm it lands at `barossacabs@outlook.com.au` **and** that the customer auto-reply arrives. Until then `/api/booking` returns 500. |
| L6 | Sender domain auth | `EMAIL_FROM` is `support@finestsemmail.com`. Confirm SPF/DKIM are valid for it in SMTP2GO or auto-replies will land in spam. |
| L7 | DNS + host redirect | Point `adelaideairporttobarossa.com.au` at the Worker and add a redirect rule `www → apex` (the canonical is the apex). |
| L8 | Analytics + consent | No analytics is installed. If GA4/Ads/Clarity go in (as on Barossataxi), add them and state it in `/privacy`, which currently says "no advertising or tracking cookies". |
| L9 | Street address in schema | `TravelAgency` schema carries locality/region/country only. Adding the real street address (and Google Business Profile `sameAs`) materially helps local ranking. |
| L10 | Re-run the 🔬 gates | Real fares, longer vehicle names and real testimonials can reintroduce overflow or contrast failures. Run `npm run audit` again after the content swap. |

## Re-verification command

```bash
npm run build
npm run serve      # terminal 1
npm run audit      # terminal 2 — 🔬 gates
```

Pass condition: `overflow:false` everywhere, `errors:[]` on every page, `contrast.failCount === 0`,
`reducedMotion.hiddenReveals === 0`, `noJsChecks.sectionCount === 10`.
