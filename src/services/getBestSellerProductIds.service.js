import { getBestSellerProductIds } from '../repositories/getBestSellerProductIds.js';

export const fetchBestSeller = async () => {
    const bestSellers = await getBestSellerProductIds();
    console.log(bestSellers);
    return bestSellers.map(({ productId }) => productId);
};
