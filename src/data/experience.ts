import type { Localized, YearMonth } from '../i18n/utils';

export interface Role {
  title: Localized;
  start: YearMonth;
  /** Omitted while the role is current. */
  end?: YearMonth;
}

export interface Experience {
  company: string;
  location: string;
  /** Most recent role first. */
  roles: Role[];
  activities: Localized<string[]>;
  highlights: Localized<string[]>;
}

export const experience: Experience[] = [
  {
    company: 'BEG Support Informática Aplicada',
    location: 'Novo Hamburgo, RS',
    roles: [
      {
        title: { pt: 'Analista de Sistemas', en: 'Systems Analyst' },
        start: '2025-06',
      },
      {
        title: { pt: 'Estagiário de TI', en: 'IT Intern' },
        start: '2024-06',
        end: '2025-06',
      },
    ],
    activities: {
      pt: [
        'Oracle DBA em OCI e on-premises',
        'Desenvolvimento com Oracle APEX',
        'Administração de servidores Linux',
        'Containers com Docker',
        'Monitoramento com Zabbix',
        'Gestão da infraestrutura de múltiplos clientes',
      ],
      // REVIEW(reinaldo): generated translation
      en: [
        'Oracle DBA on OCI and on-premises',
        'Oracle APEX development',
        'Linux server administration',
        'Containers with Docker',
        'Monitoring with Zabbix',
        'Infrastructure management for multiple clients',
      ],
    },
    // TODO(reinaldo): 2–3 concrete achievements to highlight. Hidden while empty.
    highlights: { pt: [], en: [] },
  },
];
