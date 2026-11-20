import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const createOrder = async (orderData, session) => {
    const db = await getDatabase();

    const result = await db
        .collection(COLLECTIONS.ORDERS)
        .insertOne(orderData, { session });

    return {
        ...orderData,
        _id: result.insertedId,
    };
};
