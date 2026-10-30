import { COLLECTIONS } from './collections.js';
import { getDatabase } from './mongodb.js';

/* Создаем idempotency_key */
export const createIndexes = async () => {
    const db = await getDatabase();

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
};
