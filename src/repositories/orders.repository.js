import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const createOrder = async (orderData) => {
    const db = await getDatabase();

    const result = await db.collection(COLLECTIONS.ORDERS).insertOne(orderData);

    return {
        ...orderData,
        _id: result.insertedId,
    };
};
