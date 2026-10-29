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

/** Value for Open Graph `og:locale` (underscore format). */
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' };

/** Content that exists in every locale (data files use this for translated text). */
export type Localized<T = string> = Record<Locale, T>;

/** Month precision date used in data files, e.g. `2025-06`. */
export type YearMonth = `${number}-${number}`;

/** `2025-06` → "jun 2025" (PT) / "Jun 2025" (EN). */
export function formatYearMonth(locale: Locale, value: YearMonth): string {
  const [year, month] = value.split('-').map(Number) as [number, number];
  const monthName = new Intl.DateTimeFormat(htmlLang[locale], { month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace('.', '');
  return `${monthName} ${year}`;
}

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
