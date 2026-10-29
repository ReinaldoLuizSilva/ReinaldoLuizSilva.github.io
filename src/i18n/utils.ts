import pt from './pt.json';
import en from './en.json';

export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

type Dictionary = typeof pt;

// PT is the source of truth: typing EN against its shape makes `astro check`
// fail whenever a key is missing from en.json.
const dictionaries: Record<Locale, Dictionary> = { pt, en };

/** Value for `<html lang>` and `hreflang`. */
export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' };

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * A page identified independently of language. The same Route resolves to the
 * equivalent URL in each locale, which is what the language switcher and the
 * hreflang alternates rely on.
 */
export type Route = { page: 'home' } | { page: 'project'; slug: string };

const projectsSegment: Record<Locale, string> = { pt: 'projetos', en: 'projects' };

/** Root-relative path for a route, e.g. `/en/projects/ticketops/`. */
export function pathFor(locale: Locale, route: Route): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  switch (route.page) {
    case 'home':
      return `${prefix}/`;
    case 'project':
      return `${prefix}/${projectsSegment[locale]}/${route.slug}/`;
  }
}
