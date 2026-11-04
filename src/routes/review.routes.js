import express from 'express';
import { redis } from '../config/redis.js';
import {
    getReviewRatingSummary,
    getReviewsByProduct,
    postReview,
} from '../controllers/reviews.controller.js';
import { cacheResponse } from '../middlewares/cache.middleware.js';

const router = express.Router();

router.get(
    '/reviews/ratings',
    cacheResponse('reviews:ratings:summary', 300),
    getReviewRatingSummary,
);
router.get(
    '/reviews',
    cacheResponse(async (req) => {
        const { productId, page = '1', limit = '3' } = req.query;

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);

        if (
            !productId ||
            !Number.isInteger(parsedPage) ||
            parsedPage < 1 ||
            !Number.isInteger(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 50
        ) {
            return next();
        }

        /* Проверяем версию */
        const version =
            (await redis.get(`reviews:product:${productId}:version`)) ?? 0;

        return `reviews:product:${productId}:v${version}:page:${page}:limit:${limit}`;
    }, 120),
    getReviewsByProduct,
);
router.post('/reviews', postReview);

export default router;
