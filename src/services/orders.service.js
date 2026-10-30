import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import { createHash } from 'node:crypto';
import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';
import { createOrder } from '../repositories/orders.repository.js';
import { orderCalculations } from '../utils/order-calculations.js';
import { roundMoney } from '../utils/roundMoney.js';
import { sendOrderEmails } from './order-email.service.js';
dotenv.config();

export const createOrderService = async ({
    customer,
    items,
    idempotencyKey,
}) => {
    const db = await getDatabase();

    /* Формирования  отпечатка заказа на основе данных, т.е. одни и те же полученные данные всегда будут иметь тот же отпечаток*/
    const requestHash = createHash('sha256')
        .update(JSON.stringify({ customer, items }))
        .digest('hex');

    /* Проверяем ключ */
    const existingOrder = await db
        .collection(COLLECTIONS.ORDERS)
        .findOne({ idempotencyKey });

    if (existingOrder) {
        if (existingOrder.requestHash !== requestHash) {
            const error = new Error(
                'Your order could not be processed. Please start a new checkout.',
            );

            error.statusCode = 409;
            error.code = 'IDEMPOTENCY_KEY_REUSED';

            throw error;
        }
        return {
            order: existingOrder,
            isExisting: true,
        };
    }

    /* Получение продукта */
    const productsCollection = db.collection(COLLECTIONS.PRODUCTS);

    const orderItems = [];

    /* Проверка данных продукта на текущее состояние на их валидность */
    for (const item of items) {
        if (!ObjectId.isValid(item.productId)) {
            const error = new Error(`Invalid product ID: ${item.productId}`);
            error.statusCode = 400;
            error.code = 'INVALID_PRODUCT_ID';

            throw error;
        }

        const product = await productsCollection.findOne({
            _id: new ObjectId(item.productId),
        });

        if (!product || !product.isActive) {
            const error = new Error(
                `Product is unavailable: ${item.productId}`,
            );
            error.statusCode = 409;
            error.code = 'PRODUCT_UNAVAILABLE';

            throw error;
        }

        const variant = product.variants.find(
            (variant) => variant.size === item.size,
        );

        if (!variant) {
            const error = new Error(`Size ${item.size} is unavailable`);
            error.statusCode = 404;
            error.code = 'VARIANT_NOT_FOUND';

            throw error;
        }

        if (item.quantity > variant.quantity) {
            const error = new Error(
                `Insufficient stock for ${product.title}, size ${item.size}`,
            );
            error.statusCode = 409;
            error.code = 'INSUFFICIENT_STOCK';

            throw error;
        }

        if (
            typeof product.sellerEmail !== 'string' ||
            !product.sellerEmail.trim()
        ) {
            const error = new Error(
                `Seller email is missing for ${product.title}`,
            );
            error.statusCode = 500;
            error.code = 'SELLER_EMAIL_MISSING';

            throw error;
        }

        const discountPercent =
            variant.quantityDiscount &&
            item.quantity >= variant.quantityDiscount.minQuantity
                ? variant.quantityDiscount.discountPercent
                : variant.discountPercent;

        const totalPrice = roundMoney(
            variant.price * item.quantity * (1 - discountPercent / 100),
        );

        orderItems.push({
            productId: product._id,
            title: product.title,
            image: product.images?.[0] ?? '',
            sellerId: product.sellerId,
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            size: variant.size,
            quantity: item.quantity,
            unitPrice: variant.price,
            discountPercent,
            totalPrice,
        });
    }

    const { productsTotal, deliveryTotal, sellerOrders, totalPrice } =
        orderCalculations(orderItems);

    const now = new Date();

    const orderData = {
        idempotencyKey,
        requestHash,
        orderNumber: `ORD-${new ObjectId().toHexString().slice(-8).toUpperCase()}`,
        customer,
        items: orderItems,
        productsTotal,
        deliveryTotal,
        totalPrice,
        sellerOrders,
        paymentStatus: 'pending',
        createdAt: now,
        updatedAt: now,
    };

    try {
        const order = await createOrder(orderData);
        await sendOrderEmails(order);

        return {
            order,
            isExisting: false,
        };
    } catch (error) {
        /* При любых других ошибках которые не являются ошибкой MongoDB 11000 при дублировании ключа  */
        if (error.code !== 11000) {
            throw error;
        }

        const existingOrder = await db
            .collection(COLLECTIONS.ORDERS)
            .findOne({ idempotencyKey });

        if (existingOrder) {
            if (existingOrder.requestHash !== requestHash) {
                const error = new Error(
                    'Your order could not be processed. Please start a new checkout.',
                );

                error.statusCode = 409;
                error.code = 'IDEMPOTENCY_KEY_REUSED';
                throw error;
            }
            return {
                order: existingOrder,
                isExisting: true,
            };
        }

        throw error;
    }
};
