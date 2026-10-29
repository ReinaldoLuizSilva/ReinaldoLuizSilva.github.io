import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from '../i18n/utils';

export type Project = CollectionEntry<'projects'>;
export type ProjectStatus = Project['data']['status'];

function localeOf(entry: Project): string {
  return entry.id.split('/')[0] ?? '';
}

/**
 * Projects in one language, ordered by `order`. Fails the build when a project
 * is missing in any language or its file name does not match its `slug`, so a
 * half-translated project can never be published.
 */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects');
  const slugsByLocale = new Map<string, Set<string>>(locales.map((code) => [code, new Set()]));

  for (const entry of all) {
    const code = localeOf(entry);
    const slugs = slugsByLocale.get(code);
    if (!slugs) {
      throw new Error(`Project "${entry.id}" is in an unknown language folder "${code}".`);
    }
    if (entry.id !== `${code}/${entry.data.slug}`) {
      throw new Error(`Project "${entry.id}" must be named after its slug "${entry.data.slug}".`);
    }
    slugs.add(entry.data.slug);
  }

  const allSlugs = new Set([...slugsByLocale.values()].flatMap((slugs) => [...slugs]));
  for (const slug of allSlugs) {
    const missing = locales.filter((code) => !slugsByLocale.get(code)?.has(slug));
    if (missing.length > 0) {
      throw new Error(`Project "${slug}" has no translation for: ${missing.join(', ')}.`);
    }
  }

  return all
    .filter((entry) => localeOf(entry) === locale)
    .sort((a, b) => a.data.order - b.data.order);
}
