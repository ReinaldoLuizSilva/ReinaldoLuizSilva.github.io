// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://reinaldoluizsilva.github.io',
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
