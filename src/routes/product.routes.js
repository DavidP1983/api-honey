import express from 'express';
import { getBestSeller } from '../controllers/getBestSellerProductIds.controller.js';
import {
    getProductById,
    getProducts,
    getRelatedProducts,
} from '../controllers/product.controller.js';
import { cacheResponse } from '../middlewares/cache.middleware.js';

const router = express.Router();

router.get(
    '/products',
    cacheResponse((req) => {
        const { page, limit } = req.query;

        if (page !== undefined && limit !== undefined) {
            return `products:page:${page}:limit:${limit}`;
        }

        return 'products:all';
    }, 300),
    getProducts,
);

router.get(
    '/products/best-sellers',
    cacheResponse('products:best-sellers', 86400),
    getBestSeller,
);

router.get(
    '/products/:id',
    cacheResponse((req) => {
        const { id } = req.params;
        const { size } = req.query;

        if (size === undefined) {
            return `product:${id}:size:all`;
        }

        const normalizedSize = String(size).trim().replace(/\s+/g, '');

        return `product:${id}:size:${normalizedSize}`;
    }, 600),
    getProductById,
);

router.get('/products/:id/related', getRelatedProducts);

export default router;
