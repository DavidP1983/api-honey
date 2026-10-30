import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const getCategories = async () => {
    const db = await getDatabase();

    return db.collection(COLLECTIONS.CATEGORIES).find({}).toArray();
};
