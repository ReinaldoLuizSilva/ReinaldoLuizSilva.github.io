import type { Localized } from '../i18n/utils';

export interface SkillGroup {
  area: Localized;
  /** Product and technology names are not translated. */
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    area: { pt: 'Cloud', en: 'Cloud' },
    items: [
      'Google Cloud: Cloud Run, Secret Manager, Cloud Monitoring, IAM / Workload Identity Federation',
      'Oracle Cloud Infrastructure: Autonomous Database',
    ],
  },
  {
    area: { pt: 'IaC & CI/CD', en: 'IaC & CI/CD' },
    items: ['Terraform', 'GitHub Actions'],
  },
  {
    area: { pt: 'Containers', en: 'Containers' },
    items: ['Docker'],
  },
  {
    area: { pt: 'Bancos de dados', en: 'Databases' },
    items: ['Oracle Database (DBA)', 'Oracle Autonomous Database'],
  },
  {
    area: { pt: 'Desenvolvimento', en: 'Development' },
    items: ['Python (FastAPI)', 'Oracle APEX'],
  },
  {
    area: { pt: 'Sistemas & observabilidade', en: 'Systems & observability' },
    items: ['Linux', 'Zabbix', 'Cloud Monitoring'],
  },
];
