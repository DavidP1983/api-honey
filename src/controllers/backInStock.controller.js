import { ObjectId } from 'mongodb';
import { backInStockSchema } from '../schemas/backInStock.schema.js';
import { subscribeToBackInStock } from '../services/backInStock.service.js';

export const backInStockController = async (req, res) => {
    try {
        const validation = backInStockSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: 'Invalid back in stock data',
            });
        }

        if (!ObjectId.isValid(validation.data.productId)) {
            return res.status(400).json({
                code: 'INVALID_PRODUCT_ID',
                message: 'Invalid product ID',
            });
        }

        const backInStock = await subscribeToBackInStock({
            ...validation.data,
            productId: new ObjectId(validation.data.productId),
        });

        return res.status(201).json(backInStock);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                code: 'BACK_IN_STOCK_ALREADY_EXISTS',
                message: 'You are already subscribed to this product.',
            });
        }
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message:
                statusCode === 500 ? 'Internal server error' : error.message,
            code: error.code || 'INTERNAL_SERVER_ERROR',
        });
    }
};
