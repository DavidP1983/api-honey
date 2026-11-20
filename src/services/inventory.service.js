/* Aтомарная проверка с изменением остатка */
/* Для защиты от одновременных заказов */

export const reserveProductStock = async ({
    productsCollection,
    item,
    session,
}) => {
    const result = await productsCollection.updateOne(
        {
            _id: item.productId,
            isActive: true,
            variants: {
                $elemMatch: {
                    size: item.size,
                    quantity: { $gte: item.quantity },
                },
            },
        },
        {
            $inc: {
                'variants.$.quantity': -item.quantity,
            },
        },
        { session },
    );

    if (result.matchedCount === 0) {
        const error = new Error(
            `Insufficient stock for ${item.title}, size ${item.size}`,
        );

        error.statusCode = 409;
        error.code = 'INSUFFICIENT_STOCK';

        throw error;
    }
};
