import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const getBestSellerProductIds = async () => {
    const db = await getDatabase();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(
        thirtyDaysAgo.getDate() - 30,
    ); /* Откатываемся на 30 дней назад, чтобы получить промежуток за 30 дней */

    return db
        .collection(COLLECTIONS.ORDERS)
        .aggregate([
            {
                $match: {
                    paymentStatus: 'paid',
                    createdAt: { $gte: thirtyDaysAgo },
                },
            },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.productId',
                    totalSold: { $sum: '$items.quantity' },
                },
            },
            { $sort: { totalSold: -1 } },
            {
                $setWindowFields: {
                    sortBy: { totalSold: -1 },
                    output: { rank: { $rank: {} } },
                },
            },
            { $match: { rank: 1 } },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                },
            },
        ])
        .toArray();
};
