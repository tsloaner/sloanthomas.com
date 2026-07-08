import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writingCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/writing' }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        date: z.date().optional(),
        draft: z.boolean().default(false),
        tldr: z.string().optional(),
    }),
});

export const collections = {
    writing: writingCollection,
};
