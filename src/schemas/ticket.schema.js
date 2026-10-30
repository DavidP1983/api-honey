import { z } from 'zod';

export const createTicketSchema = z.object({
    email: z.email('Invalid email address'),
    orderNumber: z.string().trim().min(12, 'Order number is required'),
    subject: z.string().trim().min(1, 'Subject is required'),
    comment: z
        .string()
        .trim()
        .min(1, 'Comment is required')
        .max(2000, 'Comment must be at most 2000 characters'),
});
