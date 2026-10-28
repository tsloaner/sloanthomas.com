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
        video: z.object({
            playbackId: z.string(),
            // ISO 8601, e.g. PT4M23S — used for VideoObject structured data
            duration: z.string().optional(),
            // Seconds into the video to use as the poster frame (Mux default: midpoint)
            posterTime: z.number().optional(),
        }).optional(),
    }),
});

export const collections = {
    writing: writingCollection,
};
