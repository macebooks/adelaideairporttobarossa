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

Last full run: **2026-08-03**, after the owner's fares and fleet replaced the placeholders.

**Status: ✅ MIGRATION-COMPLETE + TECH-SEO-CLEAN + FARES-LIVE — ⚠️ LAUNCHABLE WITH CAVEATS** (see Tier 3).

L1 (fabricated testimonials) is resolved by removing them, so **no false or misleading content is
served** and the hard content blocker is gone. What remains before go-live is operational rather
than legal-content: **L7 DNS** is what actually stands between this and a live domain. **L11**
(was/now price substantiation) is the one item that could require a same-day change if the owner
cannot stand behind the "normally" prices. L4, L12 and L13 are missing prices and confirmations
that make the page weaker, not wrong.

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
until all are cleared.** `CLIENT-INFO-REQUEST.md` is the ready-to-send message that collects the
outstanding items from the owner; its final table maps each question back to the blockers below.

| # | Blocker | What is needed |
|---|---|---|
| L1 | ~~Fabricated testimonials~~ | ✅ **Resolved 2026-08-03 by removal.** The three invented quotes (Rebecca H., Sarah & Tom K., Priya N.) are deleted. The section is now driven by the `testimonials` array in `index.astro` frontmatter and renders **only** when that array has entries — it is empty, so the section, its nav link and its heading are absent from the served HTML entirely (verified: 0 occurrences, 9 `<section>` elements, no dead `#reviews` anchor). Not CSS-hidden; nothing reaches a visitor or a crawler. **Do not restore the old quotes.** Adding real, consented reviews to the array brings the styled section back; `Review`/`AggregateRating` schema may only be added once they are genuine. |
| L2 | ~~Fares~~ | ✅ **Cleared 2026-08-03** from the owner's fleet document. Sedan $200 / Tarago $230 / HiAce $250, per car, each way, for the central townships. Single source of truth is the `fleet` array in `index.astro` frontmatter; the cards, the estimator (via `define:vars`) and the `hasOfferCatalog` schema all read from it, so they cannot drift. Estimator no longer contradicts the cards. |
| L3 | ~~Vehicle spec~~ | ✅ **Cleared 2026-08-03.** Camry Hybrid / Corolla (4 pax), Tarago (7), HiAce Commuter (13). Camry and Corolla are presented as one "sedan" card since they are the same price and capacity; both models are named. |
| L4 | Payment + cancellation terms | **Partly cleared.** Payment methods, the 48-hour free-cancellation window, driver accreditation, SA mechanical inspection, the alcohol/drinks policy and booster seats are now in the FAQ, `/terms` and the `FAQPage` schema. Still outstanding: the **exact cancellation fee** inside 48 hours, the **no-show charge**, and the `[FREE WAITING TIME…]` block in `/terms`. |
| L11 | **"Was/now" price substantiation** | New. The cards show `was $245/$275/$300` struck through beside the current fares, per the owner's document. Under ACCC rules the "was" price must be one genuinely charged for a reasonable period immediately beforehand. **Confirm with the owner, or remove the strike-throughs** (`.was` / `.save` in the fares markup). Question 2 in `CLIENT-INFO-REQUEST.md`. |
| L12 | Booster seats vs infant restraints | New. The owner specified *booster* seats, and the page now says exactly that. Whether capsules / forward-facing restraints can be supplied for babies and toddlers is unanswered; families check this before booking. Question 3 in `CLIENT-INFO-REQUEST.md`. |
| L13 | Out-of-area and return/day-tour pricing | New. Fares cover Tanunda, Lyndoch, Nuriootpa, Greenock, Angaston only. The surcharge beyond that, the return-trip price and the day-tour rate are all still "on enquiry" on the page. Seppeltsfield is currently priced as central but is not in the owner's list — needs a ruling. Question 4 in `CLIENT-INFO-REQUEST.md`. |
| L5 | SMTP2GO secret | `npx wrangler secret put SMTP2GO_API_KEY`, then submit a real booking and confirm it lands at `barossacabs@outlook.com.au` **and** that the customer auto-reply arrives. Until then `/api/booking` returns 500. |
| L6 | Sender domain auth | `EMAIL_FROM` is `support@finestsemmail.com`. Confirm SPF/DKIM are valid for it in SMTP2GO or auto-replies will land in spam. |
| L7 | DNS + host redirect | Point `adelaideairporttobarossa.com.au` at the Worker and add a redirect rule `www → apex` (the canonical is the apex). |
| L8 | Analytics + consent | No analytics is installed. If GA4/Ads/Clarity go in (as on Barossataxi), add them and state it in `/privacy`, which currently says "no advertising or tracking cookies". |
| L9 | Street address in schema | `TravelAgency` schema carries locality/region/country only. Adding the real street address (and Google Business Profile `sameAs`) materially helps local ranking. |
| L10 | Re-run the 🔬 gates | ✅ **Re-run 2026-08-03** after the fares/fleet swap — see "Post-content-swap re-verification" below. Must be run **again** when the real testimonials land (L1), since quote length is the remaining untested content variable. |

## Post-content-swap re-verification — 2026-08-03

Measured against `wrangler dev` after (a) the real fares and fleet replaced the placeholders and
(b) the fabricated testimonials were removed. Figures below are from the **final** build.

| Gate | Result |
|---|---|
| Build | 4 pages, 0 warnings, 0 errors |
| S11 overflow | **18/18 widths clean** (265→1920). `scrollWidth === clientWidth` at every width; the new `white-space:nowrap` "was" price never escapes its card at any width |
| Overflow / overlap / errors (`npm run audit`) | 20/20 page×viewport combos: 0 overflow, 0 header-H1 overlap, 0 console or network errors |
| S14 contrast | **0 failures / 186 elements** (173 before this round; 199 with the testimonials still in) |
| S17 reduced motion | 0 of 53 `.reveal` hidden, 0 sections hidden |
| S16 JS-off | **9/9 sections**, form, fares and final CTA all present; 11 FAQ `<details>` |
| S6 structured data | Both JSON-LD blocks parse. `TravelAgency` now carries `hasOfferCatalog` with the three real fares; `FAQPage` is 11 Q&A. No `Review`/`AggregateRating` (correct — there are no real reviews) |
| FAQ schema ↔ page | **11/11 exact match in both directions** — no schema-only question, no page-only question |
| Estimator behaviour | 6/6 cases pass: correct fare per vehicle, pax→vehicle and vehicle→pax auto-upgrade, Greenock route, price parity in the reverse direction. 0 JS errors |
| Placeholders | 0 occurrences of `$AUD`, `[XXX]`, `[SEATS]`, `[VEHICLE` in the built HTML |
| Testimonial removal | 0 occurrences of `Rebecca`, `Sarah & Tom`, `Priya`, `What guests say`, `id="reviews"`, `#reviews`, `grape-av`. Nav link gone, **no dead in-page anchors** (all 6 remaining `href="#…"` resolve) |
| Block colour rhythm | 10 blocks, **0 adjacent same-colour** after the dark reviews block was removed |

Note: a naive "any element past the viewport" check flags children of `.route-scroll`.
That container is `overflow-x:auto` with a deliberately 620px-wide strip inside it, so those
are intentional and are not an S11 failure — the gate is document `scrollWidth === clientWidth`.

## Re-verification command

```bash
npm run build
npm run serve      # terminal 1
npm run audit      # terminal 2 — 🔬 gates
```

Pass condition: `overflow:false` everywhere, `errors:[]` on every page, `contrast.failCount === 0`,
`reducedMotion.hiddenReveals === 0`, `noJsChecks.sectionCount === 9`.

**Note on the section count:** it was 10 until 2026-08-03, when the fabricated testimonials
section was removed (L1). It returns to 10 when real reviews are added to the `testimonials`
array — if you add reviews, expect 10 and update this line.
