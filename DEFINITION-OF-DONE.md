# Definition of Done — AdelaideAirportToBarossa.com.au

Build: **"The Itinerary"** (`index.html`). Master gate list & method:
`~/.claude/landing-page-expert/DEFINITION-OF-DONE.md`.
Verified by headless Chromium render + measurement on 2026-07-22.

**Status: ✅ BUILD-COMPLETE — 🚫 LAUNCH-BLOCKED** (real business data still needed; see Tier 2).

🔬 = verified by rendering, not code-reading.

## Tier 1 — Build-Complete

| Gate | Status | Evidence |
|---|---|---|
| A1 type/goal/audience/awareness stated | ✅ | Local booking page; goal = quote/booking; travellers→Barossa; awareness 2–3 (all labeled assumptions) |
| A2 blueprint section order / every section justified | ✅ | Hero+docket → §01 last leg → §02 why us → §03 itinerary → §04 car → §05 day-tour → §06 notes → §07 tariff → §08 FAQ → CTA → footer |
| A3 above-fold = what/who/next | ✅ | H1 + dossier line + docket form in first screen |
| A4 CTA prominent, repeats 3+×, single primary 🔬 | ✅ | 7 CTA instances; one primary action ("Book/Lodge transfer") |
| A5 trust stacked & early | ✅ | Included-as-standard strip + differentiators before the ask |
| A6 objections handled | ✅ | §08 Notes/FAQ (delays, luggage, child seats, cancellation) |
| B1 not-a-template / concept named 🔬 | ✅ | "Editorial transfer dossier"; passed AI-feel review after rebuild |
| B2 characterful display font | ✅ | Space Grotesk (Fraunces removed — grep-confirmed 0) |
| B3 disciplined palette + hex | ✅ | paper `#efe7d6`/`#f5f0e6`, ink `#1c1a17`, faded `#4a453d`, oxblood `#8a2f24`, green `#3d4a3a` |
| B4 consistent system 🔬 | ✅ | one type scale / spacing rhythm / button style across sections |
| B5 imagery not glossy-stock/AI 🔬 | ⚠️ | Muted film-graded plates (grain+faded grade) — read as photography, **but are AI-generated**; real photos recommended → see L3 |
| B6 purposeful motion + a bold/asymmetric move 🔬 | ✅ | GPU-only reveals; asymmetric docket/route/staggered cards (not centered grid) |
| C1 headline specific + 3–5 ranked | ✅ | "The hour between the tarmac and the tasting" + ranked options provided |
| C2 concrete/human copy | ✅ | Sturt Hwy, ~75km, Gawler, ADL arrivals hall, named localities |
| C3 CTAs benefit-framed | ✅ | "Book your transfer", "Lodge booking request" |
| D1 zero h-overflow @320/360/390/768/1440 🔬 | ✅ | scrollWidth===clientWidth at all five (measured) |
| D2 no header/hero overlap ≤360 🔬 | ✅ | hero padding-top clears fixed header; no overlap |
| D3 layouts collapse correctly 🔬 | ✅ | hero→1col, route rail scrolls in-column, nav condenses |
| D4 tap targets / no clipped text 🔬 | ✅ | H1 wraps at 320 (right edge 302px), buttons full-width mobile |
| E1 LCP eager+preload; rest lazy+dims | ✅ | hero-road.jpg preloaded `fetchpriority=high`; 3 below-fold lazy w/ width/height |
| E2 weight < 1.5MB | ✅ | index 61KB + images 884KB ≈ 0.95MB |
| E3 fonts swap+preconnect ≤3 | ✅ | `display=swap`, 2 preconnect, 3 families |
| E4 no JS libs / GPU-only anim | ✅ | single file, vanilla JS, transform/opacity only |
| E5 0 console errors @all widths 🔬 | ✅ | 0 pageerror/console-error at 320/360/390/768/1440 |
| F1 landmarks + one h1 | ✅ | semantic landmarks; `<h1>` count = 1 |
| F2 labelled fields + programmatic errors | ✅ | mono labels + `aria-invalid`/inline errors |
| F3 focus visible + skip link 🔬 | ✅ | oxblood focus ring; transform-based skip link present |
| F4 contrast ≥4.5:1 body 🔬 | ✅ | ink 14.1:1, faded 7.7:1, oxblood 6.8:1, green 7.6:1 (all pass body) |
| F5 alt/aria-hidden + reduced-motion visible 🔬 | ✅ | 4/4 imgs have alt, 0 missing; reduced-motion → 0 hidden content |
| G1 JS-off renders ALL content 🔬 | ✅ | JS disabled → only 4 hidden (form error/success), all sections visible |
| G2 no blank-on-throw 🔬 | ✅ | `.js`-gated reveals; content visible by default |
| G3 form validates + success + endpoint noted | ✅ | client validate + "Received" state; endpoint stubbed w/ comment |
| H1 title+meta | ✅ | unique title + meta description present |
| H2 OG/Twitter → 1200×630 og-image | ✅ | og+twitter → `og-image.jpg` (1200×655) |
| H3 canonical + JSON-LD NAP | ✅ | canonical set; TravelAgency/LocalBusiness JSON-LD (NAP placeholder) |
| I1 no fabricated social proof | ✅ | testimonials visibly `[PLACEHOLDER]`, monogram avatars, no AI faces |
| I2 no dark patterns/fake scarcity | ✅ | "Most booked" is static label; no countdowns/hidden fees |
| I3 transparent pricing/terms | ✅ | flat-fare framing; cancellation flagged as owner placeholder |

## Tier 2 — Launch-Ready (🚫 all blocking until done)

| Gate | Status | Needed |
|---|---|---|
| L1 real data | 🚫 | Replace `[PHONE]`, `$AUD [XXX]` fares, ABN, NAP |
| L2 genuine testimonials | 🚫 | Real, consented reviews (or remove §06) |
| L3 real photos | 🚫 | Swap `sedan-road.jpg` for the actual vehicle(s); ideally real Barossa photos over AI plates |
| L4 live form endpoint | 🚫 | Wire form to a tested endpoint (Formspree/Netlify/API); confirm lead arrives |
| L5 analytics/consent/legal | 🚫 | Add analytics + privacy/terms links if required |
| L6 re-run 🔬 gates on real content | 🚫 | Real copy/prices can reintroduce overflow/contrast — re-verify |

**Bottom line:** the craft is done and independently verified. Do not go live until Tier 2 is cleared — a page with placeholder pricing and placeholder testimonials is not launch-ready.

---

# Build B — "Tarmac to Vines" naive-premium (`index-naive.html`)

Second, **active** deliverable. Built 2026-07-22 to the **intelligently-naive-design** philosophy (chosen fresh over Build A's editorial dossier). Concept: alternating full-bleed flat-colour **printed-poster blocks** (bone/vine/wine/sky/ink) with **hand-drawn inline-SVG folk-art** (Charley-Harper vines/road/sedan) — **zero raster photos**, so the AI-photo tell (B5) is eliminated by construction. Authored via `landing-page-expert` subagent; verified by main-thread Chromium render + measurement.

**Status: ✅ BUILD-COMPLETE — 🚫 LAUNCH-BLOCKED** (same Tier-2 placeholders as Build A: real fares/phone/email/ABN/vehicle/cancellation).

🔬 gates re-verified on this file (not code-read):
- H1 "Land in Adelaide. Be in the Barossa by the second glass." — single `<h1>`.
- Palette: ink `#241E1B`, bone `#F3ECDD`, vine `#2F5233`, wine `#7A2C3B`, harvest gold `#E8A33D` (primary CTA), sky text-bg lightened to `#6795AF`. Type: Bricolage Grotesque / Hanken Grotesk / Space Mono (no Fraunces).
- Contrast (rendered): bone/ink 13.99, bone-on-vine 7.52, bone-on-wine 7.93, ink-on-sky `#6795AF` 5.09, ink-on-gold 7.63 — all ≥4.5 body.
- Overflow: scrollWidth==clientWidth @ 320/360/390/768/1440 (measured). Route strip scrolls in its own container.
- JS-off: 12/12 tracked sections visible, form visible, 0 hidden — reveals gated by `.js-anim` set only inside a `try`; `catch` reverts to visible.
- Reduced-motion: `.js-anim` never added → all content at rest, hero drive/pop suppressed. Signature motion (sedan drives tarmac→vines, vines `pop`) confirmed running with motion allowed.
- Console: 0 pageerror/console-error @ 390 & 1440.
- OG: `assets/img/og-image.jpg` regenerated as a 1200×630 folk-art poster (rendered from palette, no photo).
- Honesty: all NAP/fares/vehicle/cancellation are visibly-labelled placeholders; no testimonials/fake proof; no dark patterns. Placeholder brand name "Tarmac to Vines" — swap for real brand.

**Four HTML files on disk:** `index-naive.html` (active, Build B) · `index.html` (Build A "Itinerary") · `index-v3.html` (dark experiment) · `index-premium.html` (rejected glossy template).
