import { z } from 'zod';

export const categorySchema = z.object({
    name: z.object({
        en: z.string().min(1),
        ru: z.string().min(1),
    }),
    slug: z.string().min(1),
    description: z.object({
        en: z.string(),
        ru: z.string(),
    }),
    isActive: z.boolean(),
});
