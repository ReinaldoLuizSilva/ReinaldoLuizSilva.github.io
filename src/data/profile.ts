import type { Locale } from '../i18n/utils';

type Localized = Record<Locale, string>;

export const profile = {
  name: 'Reinaldo Luiz da Silva',
  title: {
    pt: 'Analista de Sistemas · Cloud & DevOps',
    en: 'Systems Analyst · Cloud & DevOps',
  } satisfies Localized,
  location: {
    pt: 'Novo Hamburgo, RS, Brasil',
    en: 'Novo Hamburgo, RS, Brazil',
  } satisfies Localized,
  links: {
    github: 'https://github.com/ReinaldoLuizSilva',
    linkedin: 'https://www.linkedin.com/in/reinaldoluizdasilva',
    email: 'reinaldoluisdasilva@gmail.com',
    // TODO(reinaldo): add public/cv-pt.pdf and public/cv-en.pdf; the link stays hidden until then.
  },
} as const;
