import type { Localized } from '../i18n/utils';

export const profile = {
  name: 'Reinaldo Luiz da Silva',
  title: {
    pt: 'Analista de Sistemas · Cloud & DevOps',
    en: 'Systems Analyst · Cloud & DevOps',
  } satisfies Localized,
  headline: {
    pt: 'Infraestrutura multicloud, do banco de dados ao pipeline.',
    en: 'Multicloud infrastructure, from the database to the pipeline.',
  } satisfies Localized,
  positioning: {
    pt: 'Experiência prática em Google Cloud e Oracle Cloud Infrastructure, com background em administração de bancos de dados Oracle.',
    // REVIEW(reinaldo): generated translation
    en: 'Hands-on experience with Google Cloud and Oracle Cloud Infrastructure, with a background in Oracle database administration.',
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
    cv: undefined as Localized | undefined,
  },
} as const;
