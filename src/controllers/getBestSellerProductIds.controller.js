import { fetchBestSeller } from '../services/getBestSellerProductIds.service.js';

export const getBestSeller = async (req, res) => {
    try {
        const bestSeller = await fetchBestSeller();

        res.status(200).json(bestSeller);
    } catch (error) {
        res.status(500).json({
            code: 'BESTSELLER_FETCH_FAILED',
            message: 'Failed to fetch bestSeller',
        });
    }
};
