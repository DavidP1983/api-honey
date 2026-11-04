import { ObjectId } from 'mongodb';
import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

const getProducts = async (page, limit) => {
    const db = await getDatabase();

    const query = db
        .collection(COLLECTIONS.PRODUCTS)
        .find({})
        .sort({ createdAt: -1 });

    if (page !== undefined && limit !== undefined) {
        const skip = (page - 1) * limit;

        query.skip(skip).limit(limit);
    }

    return query.toArray();
};

const getProductById = async (id) => {
    const db = await getDatabase();

    return db
        .collection(COLLECTIONS.PRODUCTS)
        .findOne({ _id: new ObjectId(id) });
};

const getRelatedProducts = async (id, limit = 3) => {
    const db = await getDatabase();

    return db
        .collection(COLLECTIONS.PRODUCTS)
        .aggregate([
            {
                $match: {
                    _id: { $ne: new ObjectId(id) },
                    isActive: true,
                },
            },
            { $sample: { size: limit } },
        ])
        .toArray();
};

export { getProductById, getProducts, getRelatedProducts };
