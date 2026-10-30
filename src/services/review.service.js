import {
    createReviewInRepository,
    getReviewRatingSummary,
    getReviewsByProduct,
} from '../repositories/review.repository.js';

export const fetchReviewRatingSummary = async () => {
    return getReviewRatingSummary();
};

export const fetchReviewsByProduct = async (productId, page = 1, limit = 3) => {
    return getReviewsByProduct(productId, page, limit);
};

export const createReview = async (review) => {
    return createReviewInRepository(review);
};
