import express from 'express';
import {
    getReviewRatingSummary,
    getReviewsByProduct,
    postReview,
} from '../controllers/reviews.controller.js';

const router = express.Router();

router.get('/reviews/ratings', getReviewRatingSummary);
router.get('/reviews', getReviewsByProduct);
router.post('/reviews', postReview);

export default router;
