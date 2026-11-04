import { ObjectId } from 'mongodb';
import {
    fetchProductById,
    fetchProducts,
    fetchRelatedProducts,
} from '../services/product.service.js';

const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        let products;

        if (page !== undefined && limit !== undefined) {
            products = await fetchProducts(Number(page), Number(limit));
        } else {
            products = await fetchProducts();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            code: 'PRODUCTS_FETCH_FAILED',
            message: 'Failed to fetch products',
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { size } = req.query;

        /* Checking incorrect id*/
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 'INVALID_PRODUCT_ID',
                message: 'Invalid product ID',
            });
        }

        const product = await fetchProductById(id);

        if (!product) {
            return res.status(400).json({
                code: 'PRODUCT_NOT_FOUND',
                message: 'Product not found',
            });
        }

        if (size !== undefined) {
            const parsedSize = size.trim();

            if (!parsedSize) {
                return res.status(400).json({
                    code: 'INVALID_PRODUCT_SIZE',
                    message: 'Invalid product size',
                });
            }

            const variant = product.variants.find(
                (item) => item.size === parsedSize,
            );

            if (!variant) {
                return res.status(404).json({
                    code: 'PRODUCT_VARIANT_NOT_FOUND',
                    message: 'Product variant not found',
                });
            }

            return res.status(200).json({
                ...product,
                variants: [variant],
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            code: 'PRODUCT_FETCH_FAILED',
            message: 'Failed to fetch product',
        });
    }
};

const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const rawLimit = req.query.limit ?? '3';

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                code: 'INVALID_PRODUCT_ID',
                message: 'Invalid product ID',
            });
        }

        const limit = Number(rawLimit);

        if (!Number.isInteger(limit) || limit < 1 || limit > 10) {
            return res.status(400).json({
                code: 'INVALID_PRODUCT_LIMIT',
                message: 'Limit must be an integer between 1 and 10',
            });
        }

        const products = await fetchRelatedProducts(id, limit);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            code: 'RELATED_PRODUCTS_FETCH_FAILED',
            message: 'Failed to fetch related products',
        });
    }
};

export { getProductById, getProducts, getRelatedProducts };
