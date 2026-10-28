// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://reinaldoluizsilva.github.io',
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
