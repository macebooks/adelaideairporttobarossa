import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';

/*
  Sitemap, generated at build time.

  This replaces the old hand-written `public/sitemap.xml`, whose <lastmod> was a literal
  date string. It was written 2026-07-25, the content changed on 2026-08-03, and nothing
  made the date follow — so the sitemap told Google the page was three weeks staler than
  it was. A literal date in a static file decays silently every time anyone edits a page.

  `lastmod` now comes from the page's own source file, in this order:

    1. the date of the last git commit that touched it — the accurate answer, and the one
       that keeps an unchanged page's date stable across deploys;
    2. the file's mtime, if git is unavailable or has no history for the file (a shallow
       CI clone can do this);
    3. the build date, as a last resort.

  Step 1 matters more than it looks. Google treats a `lastmod` that bumps on every deploy
  as noise and starts ignoring the field, so deriving it from the build date alone would
  trade one broken signal for another.

  Routes are listed explicitly rather than globbed: /404 must stay out (it is noindex and
  carries no canonical), and priority/changefreq are editorial judgements, not facts about
  the filesystem. Adding a page means adding a line here.
*/

const ROUTES = [
  { path: '/', source: 'index.astro', changefreq: 'monthly', priority: '1.0' },
  {
    path: '/group-transfers-adelaide-airport-barossa-valley',
    source: 'group-transfers-adelaide-airport-barossa-valley.astro',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/how-to-get-from-adelaide-airport-to-barossa-valley',
    source: 'how-to-get-from-adelaide-airport-to-barossa-valley.astro',
    // Third-party facts date faster than anything else on the site, so this one is
    // genuinely expected to change. See the provenance note in the page itself.
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/adelaide-airport-to-barossa-valley-distance-and-transfer-times',
    source: 'adelaide-airport-to-barossa-valley-distance-and-transfer-times.astro',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/adelaide-airport-to-tanunda-transfer',
    source: 'adelaide-airport-to-tanunda-transfer.astro',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/adelaide-airport-to-nuriootpa-transfer',
    source: 'adelaide-airport-to-nuriootpa-transfer.astro',
    changefreq: 'monthly',
    priority: '0.7',
  },
  { path: '/privacy', source: 'privacy.astro', changefreq: 'yearly', priority: '0.2' },
  { path: '/terms', source: 'terms.astro', changefreq: 'yearly', priority: '0.2' },
] as const;

const isoDay = (d: Date) => d.toISOString().slice(0, 10);

function lastModified(source: string): string {
  // process.cwd() is the project root during `astro build`. Deliberately not
  // import.meta.url, which Vite rewrites to the bundled chunk's location.
  const file = join(process.cwd(), 'src', 'pages', source);

  try {
    // `--date=short --format=%cd`, not `--format=%cs`: git prints an unknown placeholder
    // back verbatim rather than failing, and %cs is absent from the git 2.22 that ships
    // on this machine. The regex below is what catches that, so keep it.
    const committed = execFileSync('git', ['log', '-1', '--date=short', '--format=%cd', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(committed)) return committed;
  } catch {
    // No git binary, no repository, or no history for this file. Fall through.
  }

  try {
    return isoDay(statSync(file).mtime);
  } catch {
    return isoDay(new Date());
  }
}

export const GET: APIRoute = ({ site }) => {
  // `site` is astro.config.mjs's `site`, so the host cannot drift from the canonicals.
  const origin = site ?? new URL('https://adelaideairporttobarossa.com.au');

  const urls = ROUTES.map(({ path, source, changefreq, priority }) => {
    const loc = new URL(path, origin).href;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastModified(source)}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
