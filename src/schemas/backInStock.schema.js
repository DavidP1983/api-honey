import { z } from 'zod';

export const backInStockSchema = z.object({
    email: z.email('Invalid email address'),
    productId: z.string().trim(),
});
