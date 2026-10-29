// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://reinaldoluizsilva.github.io',
  // sitemap-index.xml with every page in both languages (the 404 is left out).
  // Language alternates live in each page's hreflang links: PT and EN project
  // URLs differ (/projetos/ vs /en/projects/), so the sitemap cannot pair them.
  integrations: [sitemap()],
  // Every page is a directory (/en/, /projetos/slug/); canonical URLs end in a slash.
  trailingSlash: 'always',
  // PT-BR at the root, EN under /en/. No automatic language detection or redirects.
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
