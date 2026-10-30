import { z } from 'zod';

export const reviewSchema = z.object({
    productId: z.string().trim(),
    name: z.string().trim().min(1).max(50),
    city: z.string().trim().min(1).max(50),
    title: z.string().trim().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(10).max(1000),
});
