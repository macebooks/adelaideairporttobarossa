/*
  Headless audit harness — the gates in DEFINITION-OF-DONE.md marked 🔬 are measured here,
  not eyeballed. Start the site first (`npx wrangler dev --port 8787 --local`), then:

      npm run audit                     # prints a JSON report
      AUDIT_BASE=https://... npm run audit
      CHROME_PATH="/path/to/chrome" npm run audit

  Checks: per-viewport horizontal overflow, header/H1 overlap, tiny tap targets,
  console + network errors, WCAG AA text contrast, prefers-reduced-motion, JS-disabled
  rendering, paint timings + resource weight, and the head/SEO tags on every route.
*/
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!CHROME) {
  console.error('No Chrome found. Set CHROME_PATH to your Chrome/Chromium binary.');
  process.exit(1);
}
const BASE = process.env.AUDIT_BASE || 'http://localhost:8787';
const out = {};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

async function openPage() {
  const p = await browser.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  p.on('requestfailed', (r) => errors.push('reqfail: ' + r.url() + ' ' + r.failure()?.errorText));
  return { p, errors };
}

// ── 1. Console/network errors + viewport sweep on every page ─────────────────
const PAGES = ['/', '/privacy', '/terms', '/404'];
const VIEWPORTS = [
  { w: 320, h: 640, name: '320 (iPhone SE)' },
  { w: 360, h: 800, name: '360 (Android)' },
  { w: 390, h: 844, name: '390 (iPhone 14)' },
  { w: 768, h: 1024, name: '768 (tablet)' },
  { w: 1440, h: 900, name: '1440 (desktop)' },
];

out.pages = {};
for (const path of PAGES) {
  const { p, errors } = await openPage();
  const perView = [];
  for (const v of VIEWPORTS) {
    await p.setViewport({ width: v.w, height: v.h, deviceScaleFactor: 1 });
    const resp = await p.goto(BASE + path, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 250));
    const m = await p.evaluate(() => {
      const de = document.documentElement;
      const head = document.querySelector('.site-head, .legal-head');
      const h1 = document.querySelector('h1');
      const hb = head ? head.getBoundingClientRect().bottom : 0;
      const tap = [...document.querySelectorAll('a.btn, button, summary, select, input:not([type=hidden]), a[href^="tel:"], a[href^="mailto:"]')]
        .filter((el) => !el.closest('.hp'))
        .map((el) => { const r = el.getBoundingClientRect(); return { sel: el.tagName + '.' + String(el.className || '').split(' ')[0], h: Math.round(r.height), w: Math.round(r.width) }; })
        .filter((t) => t.h > 0 && t.h < 24);
      return {
        eff: de.clientWidth,
        scrollW: de.scrollWidth,
        overflow: de.scrollWidth > de.clientWidth,
        headerOverlapsH1: h1 ? h1.getBoundingClientRect().top < hb : false,
        tinyTargets: tap,
      };
    });
    perView.push({ view: v.name, status: resp.status(), ...m });
  }
  out.pages[path] = { views: perView, errors };
  await p.close();
}

// ── 2. Contrast on the real rendered page ────────────────────────────────────
{
  const { p } = await openPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  out.contrast = await p.evaluate(() => {
    const lum = ([r, g, b]) => { const s = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]; };
    const parse = (c) => c.match(/[\d.]+/g).slice(0, 3).map(Number);
    const bgOf = (el) => { let n = el; while (n && n !== document.documentElement) { const c = getComputedStyle(n).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return parse(c); n = n.parentElement; } return [255, 255, 255]; };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const results = [];
    const els = [...document.querySelectorAll('p, li, h1, h2, h3, a, span, label, summary, b, blockquote, button')]
      .filter((el) => el.offsetParent !== null && el.textContent.trim().length > 1 && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
    for (const el of els) {
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      const bg = bgOf(el);
      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const r = ratio(fg, bg);
      const min = large ? 3 : 4.5;
      if (r < min) results.push({ text: el.textContent.trim().slice(0, 40), color: cs.color, bg: `rgb(${bg.join(',')})`, size: Math.round(size), ratio: +r.toFixed(2), needs: min });
    }
    return { failures: results.slice(0, 20), failCount: results.length, checked: els.length };
  });
  await p.close();
}

// ── 3. prefers-reduced-motion: nothing may stay hidden ───────────────────────
{
  const { p } = await openPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  out.reducedMotion = await p.evaluate(() => {
    const vis = (el) => { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05; };
    const reveals = [...document.querySelectorAll('.reveal')];
    return {
      htmlClass: document.documentElement.className,
      totalReveals: reveals.length,
      hiddenReveals: reveals.filter((el) => !vis(el)).length,
      sectionsHidden: [...document.querySelectorAll('main section')].filter((s) => !vis(s)).length,
    };
  });
  await p.close();
}

// ── 4. JavaScript disabled: all content must still render ────────────────────
{
  const { p } = await openPage();
  await p.setJavaScriptEnabled(false);
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  out.noJs = await p.evaluate(() => 1).catch(() => 'eval-disabled');
  out.noJsHtml = await p.evaluate(() => document.body.innerText.length).catch(() => null);
  const html = await p.content();
  out.noJsChecks = {
    htmlLength: html.length,
    hasForm: html.includes('id="booking-form"'),
    sectionCount: (html.match(/<section/g) || []).length,
    faqCount: (html.match(/<details/g) || []).length,
    hasFares: html.includes('One price, agreed before you fly'),
    hasFaq: html.includes('The questions people actually ask'),
    hasFinalCta: html.includes('Sort the drive now'),
    revealClassOnHtml: /<html[^>]*class="[^"]*js-anim/.test(html),
  };
  await p.close();
}

// ── 5. Perf-ish metrics + resource weight on the real page ───────────────────
{
  const { p } = await openPage();
  await p.setViewport({ width: 390, height: 844 });
  const resources = [];
  p.on('response', async (r) => {
    try { const len = Number(r.headers()['content-length'] || 0); resources.push({ url: r.url().replace(BASE, ''), type: r.request().resourceType(), status: r.status(), bytes: len }); } catch {}
  });
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const paints = await p.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint').map((e) => ({ name: e.name, t: Math.round(e.startTime) }));
    let lcp = 0;
    return new Promise((res) => {
      try {
        new PerformanceObserver((list) => { for (const e of list.getEntries()) lcp = Math.round(e.startTime); }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {}
      setTimeout(() => res({ domContentLoaded: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd), paint, lcp }), 800);
    });
  });
  out.perf = { paints, resources: resources.filter((r) => r.type !== 'other') };
  await p.close();
}

// ── 6. Structured data + head tags on every page ─────────────────────────────
out.seo = {};
for (const path of PAGES) {
  const { p } = await openPage();
  await p.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  out.seo[path] = await p.evaluate(() => ({
    title: document.title,
    titleLen: document.title.length,
    desc: document.querySelector('meta[name=description]')?.content,
    descLen: document.querySelector('meta[name=description]')?.content?.length,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    robots: document.querySelector('meta[name=robots]')?.content,
    ogUrl: document.querySelector('meta[property="og:url"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    h1Count: document.querySelectorAll('h1').length,
    h1: document.querySelector('h1')?.textContent.trim().slice(0, 60),
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent)['@type']; } catch (e) { return 'INVALID'; } }),
    imgsMissingAlt: [...document.images].filter((i) => !i.alt).length,
    lang: document.documentElement.lang,
    internalLinks: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
  }));
  await p.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
