import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const createSubscription = async (email, productId) => {
    const db = await getDatabase();

    const subscription = {
        email,
        productId,
        status: 'pending',
        createdAt: new Date(),
        notifiedAt: null,
    };

    await db
        .collection(COLLECTIONS.BACK_IN_STOCK_SUBSCRIPTIONS)
        .insertOne(subscription);

    return subscription;
};
