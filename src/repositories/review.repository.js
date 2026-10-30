import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const getReviewRatingSummary = async () => {
    const db = await getDatabase();

    return db
        .collection(COLLECTIONS.REVIEWS)
        .aggregate([
            {
                $group: {
                    _id: '$productId',
                    averageRating: { $avg: '$rating' },
                    reviewCount: { $sum: 1 },
                },
            },
        ])
        .toArray();
};

export const getReviewsByProduct = async (productId, page = 1, limit = 3) => {
    const db = await getDatabase();

    const skip = (page - 1) * limit;

    const reviews = await db
        .collection(COLLECTIONS.REVIEWS)
        .find({ productId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    const total = await db
        .collection(COLLECTIONS.REVIEWS)
        .countDocuments({ productId });

    const ratingStats = await db
        .collection(COLLECTIONS.REVIEWS)
        .aggregate([
            { $match: { productId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                },
            },
        ])
        .toArray();

    const averageRating = Number(
        (ratingStats[0]?.averageRating ?? 0).toFixed(1),
    );

    return {
        reviews,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        averageRating,
    };
};

export const createReviewInRepository = async (review) => {
    const db = await getDatabase();

    const result = await db.collection(COLLECTIONS.REVIEWS).insertOne({
        ...review,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    /* возвращает сохранённый документ вместе с MongoDB _id. */
    return db.collection(COLLECTIONS.REVIEWS).findOne({
        _id: result.insertedId,
    });
};
