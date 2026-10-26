/*
  prebuild: give the sitemap real git history.

  Workers Builds checks the repo out as a shallow clone, and src/pages/sitemap.xml.ts
  refuses to build from one (every page would get HEAD's date as <lastmod>). Rather than
  weaken that guard, fetch the missing history here. npm runs this automatically before
  `npm run build`, which is the Workers Builds build command.

  If the fetch fails, say why and exit 0: the sitemap guard then stops the build with
  its own explanation, which is the right outcome.
*/
import { execFileSync } from 'node:child_process';

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

let shallow;
try {
  shallow = git('rev-parse', '--is-shallow-repository');
} catch {
  process.exit(0); // not a git checkout; the sitemap falls back to file mtimes
}

if (shallow === 'true') {
  try {
    git('fetch', '--unshallow', '--quiet');
    console.log('prebuild: fetched full git history for sitemap <lastmod> dates');
  } catch (e) {
    console.warn(`prebuild: could not unshallow (${e.stderr?.trim() || e.message})`);
  }
}
