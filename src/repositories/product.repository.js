import { ObjectId } from 'mongodb';
import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

const getProducts = async (page = 1, limit = 16) => {
    const db = await getDatabase();

    const skip = (page - 1) * limit;
    return db
        .collection(COLLECTIONS.PRODUCTS)
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();
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
