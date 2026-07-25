# adelaideairporttobarossa.com.au

Private car transfers between Adelaide Airport (ADL) and the Barossa Valley. Astro static site
served by a Cloudflare Worker, with a booking endpoint that emails the business and auto-replies to
the customer. Project layout and Worker mirror the `Barossataxi` project.

## Layout

```
src/pages/index.astro     the one-page site (poster build, inline SVG, no raster photos)
src/pages/privacy.astro   /privacy
src/pages/terms.astro     /terms
src/pages/404.astro       404 (noindex, no canonical)
src/layouts/Legal.astro   shared shell for the legal + 404 pages
worker/index.ts           POST /api/booking + static-asset fallthrough
public/                   robots.txt, sitemap.xml, _headers, icons, assets/
scripts/audit.mjs         headless audit behind `npm run audit`
legacy/                   superseded builds and unused Build-A photography (not deployed)
```

## Commands

```bash
npm install
npm run dev        # Astro dev server (no Worker, so /api/booking is absent)
npm run build      # → dist/
npm run serve      # wrangler dev on :8787 — the real stack, Worker + assets
npm run audit      # headless SEO/a11y/layout audit against :8787
npm run deploy     # astro build && wrangler deploy
```

`npm run serve` is the one that matters before shipping: the booking form only exists behind the
Worker.

## Configuration

Non-secret config lives in `wrangler.toml` under `[vars]`:

| Var | Purpose |
|---|---|
| `EMAIL_FROM` | SMTP2GO sender. Needs valid SPF/DKIM. |
| `EMAIL_CC` | Comma-separated list; every address gets the booking notification. |
| `EMAIL_REPLY_TO` | Where a customer's reply to the auto-reply lands. |

The API key is a secret, never a var:

```bash
npx wrangler secret put SMTP2GO_API_KEY
```

For local runs, copy `.dev.vars.example` to `.dev.vars` (gitignored) and put the key there.

## Booking endpoint

`POST /api/booking` with JSON `{name, email, phone, flight?, date, passengers?, dropoff?, notes?}`.

- honeypot field `website` — if filled, returns 200 and sends nothing;
- 3 requests per minute per IP, then 429;
- validates required fields, email format, field lengths and the drop-off whitelist;
- emails the business (Reply-To the customer) then auto-replies to the customer (Reply-To the
  business inbox);
- returns `{success:true}` or `{error:"…"}`, which the page renders inline.

## Before going live

Work through Tier 3 in `DEFINITION-OF-DONE.md`. The short version: real testimonials or none, real
fares, the SMTP2GO secret, DNS plus a `www → apex` redirect.
