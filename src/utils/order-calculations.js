import dotenv from 'dotenv';
import { roundMoney } from './roundMoney.js';
dotenv.config();

export const orderCalculations = (orderItems) => {
    const productsTotal = roundMoney(
        orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
    );

    const deliveryPrice = Number(process.env.DELIVERY_PRICE);

    if (!Number.isFinite(deliveryPrice) || deliveryPrice < 0) {
        const error = new Error('Invalid delivery price configuration');
        error.statusCode = 500;
        error.code = 'INVALID_DELIVERY_PRICE';

        throw error;
    }

    const sellerOrdersMap = new Map();

    for (const item of orderItems) {
        const sellerId = item.sellerId?.toString();

        if (!sellerId) {
            const error = new Error('Seller ID is missing');
            error.statusCode = 500;
            error.code = 'SELLER_ID_MISSING';
            throw error;
        }

        if (!sellerOrdersMap.has(sellerId)) {
            sellerOrdersMap.set(sellerId, {
                sellerId,
                items: [],
                productsTotal: 0,
                deliveryPrice,
                totalPrice: 0,
                deliveryStatus: 'pending',
            });
        }

        sellerOrdersMap.get(sellerId).items.push(item);
    }

    const sellerOrders = [...sellerOrdersMap.values()].map((sellerOrder) => {
        const sellerProductsTotal = roundMoney(
            sellerOrder.items.reduce((sum, item) => sum + item.totalPrice, 0),
        );

        return {
            ...sellerOrder,
            productsTotal: sellerProductsTotal,
            totalPrice: roundMoney(
                sellerProductsTotal + sellerOrder.deliveryPrice,
            ),
        };
    });

    /* Стоимость доставки всех продавцов */
    const deliveryTotal = roundMoney(
        sellerOrders.reduce(
            (sum, sellerOrder) => sum + sellerOrder.deliveryPrice,
            0,
        ),
    );

    const totalPrice = roundMoney(productsTotal + deliveryTotal);

    return { productsTotal, deliveryTotal, sellerOrders, totalPrice };
};
