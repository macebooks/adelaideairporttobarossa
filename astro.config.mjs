import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://adelaideairporttobarossa.com.au',
  output: 'static',
  // Emit flat files (foo.html) instead of foo/index.html so Cloudflare serves
  // the no-slash URL with a 200 directly — no 307 trailing-slash redirect.
  // This aligns the served URL with the canonical/og:url/sitemap (all no-slash).
  build: { format: 'file' },
  trailingSlash: 'never',
});
