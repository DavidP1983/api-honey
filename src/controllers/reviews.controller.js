import { reviewSchema } from '../schemas/review.schema.js';
import {
    createReview,
    fetchReviewRatingSummary,
    fetchReviewsByProduct,
} from '../services/review.service.js';

export const getReviewRatingSummary = async (req, res) => {
    try {
        const reviews = await fetchReviewRatingSummary();

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            code: 'REVIEW_RATING_SUMMARY_FETCH_FAILED',
            message: 'Failed to fetch reviews',
        });
    }
};

export const getReviewsByProduct = async (req, res) => {
    try {
        const { productId, page = '1', limit = '3' } = req.query;

        if (!productId) {
            return res.status(404).json({
                code: 'REVIEW_PRODUCT_ID_REQUIRED',
                message: 'productId is required',
            });
        }

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);

        if (
            !Number.isInteger(parsedPage) ||
            parsedPage < 1 ||
            !Number.isInteger(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 50
        ) {
            return res.status(400).json({
                code: 'INVALID_REVIEW_PAGINATION',
                message: 'Invalid pagination parameters',
            });
        }

        const reviews = await fetchReviewsByProduct(
            productId,
            parsedPage,
            parsedLimit,
        );

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            code: 'PRODUCT_REVIEWS_FETCH_FAILED',
            message: 'Failed to fetch reviews',
        });
    }
};

export const postReview = async (req, res) => {
    try {
        const result = reviewSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                code: 'INVALID_REVIEW_DATA',
                message: 'All review fields are required',
            });
        }

        const review = await createReview(result.data);

        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({
            code: 'REVIEW_CREATE_FAILED',
            message: 'Failed to create review',
        });
    }
};
