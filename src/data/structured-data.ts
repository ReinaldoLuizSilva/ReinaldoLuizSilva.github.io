// Schema.org data for search engines, built only from the other data files.
import { profile } from './profile';
import { experience } from './experience';
import { education } from './education';
import { pathFor, type Locale } from '../i18n/utils';

/** JSON-LD `Person` for the home page. */
export function personJsonLd(locale: Locale, site: URL): Record<string, unknown> {
  const { name, title, address, links } = profile;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: title[locale],
    url: new URL(pathFor(locale, { page: 'home' }), site).href,
    email: `mailto:${links.email}`,
    sameAs: [links.github, links.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    // Current employers: jobs with a role that has not ended.
    worksFor: experience
      .filter((job) => job.roles.some((role) => !role.end))
      .map((job) => ({ '@type': 'Organization', name: job.company })),
    alumniOf: education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.institution,
    })),
  };
}
