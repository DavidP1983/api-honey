import { COLLECTIONS } from './collections.js';
import { getDatabase } from './mongodb.js';

export const createIndexes = async () => {
    const db = await getDatabase();

    /* Создаем idempotency_key */
    await db.collection(COLLECTIONS.ORDERS).createIndex(
        { idempotencyKey: 1 },
        {
            unique: true,
            partialFilterExpression: {
                idempotencyKey: { $type: 'string' },
            },
            name: 'unique_idempotency_key',
        },
    );

    /* Индекс для защиты Back in Stock от повторных подписок */
    await db.collection(COLLECTIONS.BACK_IN_STOCK_SUBSCRIPTIONS).createIndex(
        { email: 1, productId: 1 },
        {
            unique: true,
            name: 'unique_back_in_stock_subscription',
        },
    );
};
