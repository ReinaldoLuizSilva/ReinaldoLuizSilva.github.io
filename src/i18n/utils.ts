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
