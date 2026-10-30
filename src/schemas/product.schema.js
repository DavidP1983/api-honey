import { z } from 'zod';

const discountPercentSchema = z.union([
    z.literal(0),
    z.literal(5),
    z.literal(10),
    z.literal(15),
]);

const quantityDiscountSchema = z.object({
    minQuantity: z.number().int().positive(),
    discountPercent: discountPercentSchema,
});

export const productSchema = z.object({
    sellerId: z.string(),
    sellerName: z.string(),
    sellerEmail: z.email(),
    contacts: z.array(
        z.object({
            type: z.enum(['facebook', 'whatsapp', 'telegram', 'email']),
            value: z.string().min(1),
        }),
    ),
    categoryId: z.string(),

    title: z.string().min(1),
    slug: z.string().min(1),

    description: z.object({
        producer: z.string(),
        color: z.string(),
        origin: z.string(),
        text: z.string(),
    }),

    images: z.array(z.string()),

    variants: z.array(
        z.object({
            size: z.string().min(1),
            price: z.number(),
            quantity: z.number(),
            discountPercent: discountPercentSchema,
            quantityDiscount: quantityDiscountSchema.optional(),
        }),
    ),

    isActive: z.boolean(),
});
