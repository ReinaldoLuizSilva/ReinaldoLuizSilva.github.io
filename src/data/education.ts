import type { Localized, YearMonth } from '../i18n/utils';

export interface Education {
  degree: Localized;
  institution: string;
  completed: YearMonth;
}

export const education: Education[] = [
  {
    degree: {
      pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      // REVIEW(reinaldo): generated translation
      en: 'Technologist Degree in Systems Analysis and Development',
    },
    institution: 'IENH',
    completed: '2026-07',
  },
];
