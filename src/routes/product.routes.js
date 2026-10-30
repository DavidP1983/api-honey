import express from 'express';
import {
    getProductById,
    getProducts,
    getRelatedProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/products/:id/related', getRelatedProducts);

export default router;
