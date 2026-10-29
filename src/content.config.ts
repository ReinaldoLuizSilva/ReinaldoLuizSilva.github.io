import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project and language: src/content/projects/<locale>/<slug>.md.
// Frontmatter holds the card data; the body is the detail page text.
const projects = defineCollection({
  loader: glob({
    pattern: '*/*.md',
    base: './src/content/projects',
    // "pt/ticketops.md" → "pt/ticketops". The default would use the `slug` field
    // as the id and make the PT and EN versions of a project collide.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string(),
    /** One sentence, shown on the home page. */
    summary: z.string(),
    status: z.enum(['concluído', 'em desenvolvimento', 'em planejamento']),
    stack: z.array(z.string()).min(1),
    repo: z.url(),
    demo: z.url().optional(),
    featured: z.boolean(),
    order: z.number().int(),
    /** Text equivalent of the architecture diagram, when the project has one. */
    diagramDescription: z.string().optional(),
  }),
});

export const collections = { projects };
