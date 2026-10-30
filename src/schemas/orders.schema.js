import { z } from 'zod';

export const createOrderSchema = z.object({
    customer: z.object({
        name: z.string().trim().min(1, 'Name is required'),
        surname: z.string().trim().min(1, 'Surname is required'),
        email: z.email(),
        phone: z.string().trim().optional().default(''),
        address: z.object({
            country: z.string().trim().min(1, 'Country is required'),
            city: z.string().trim().min(1, 'City is required'),
            street: z.string().trim().min(1, 'Street address is required'),
            apartment: z.string().trim().optional().default(''),
            postalCode: z.string().trim().optional().default(''),
        }),
        comment: z.string().trim().optional().default(''),
    }),

    items: z
        .array(
            z.object({
                productId: z.string().min(1, 'Product ID is required'),
                size: z.string().trim().min(1, 'Size is required'),
                quantity: z.number().int().positive(),
            }),
        )
        .min(1, 'Order must contain at least one item'),
});
