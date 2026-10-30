import { createOrderSchema } from '../schemas/orders.schema.js';
import { createOrderService } from '../services/orders.service.js';

export const createOrder = async (req, res) => {
    try {
        const idempotencyKey = req.get('Idempotency-Key');

        if (!idempotencyKey) {
            return res.status(400).json({
                message: 'Unable to process your order. Please try again.',
                code: 'IDEMPOTENCY_KEY_REQUIRED',
            });
        }

        const validation = createOrderSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: 'Invalid order data',
                code: 'VALIDATION_ERROR',
            });
        }

        const { order, isExisting } = await createOrderService({
            ...validation.data,
            idempotencyKey,
        });

        return res.status(isExisting ? 200 : 201).json({
            message: isExisting
                ? 'Order already exists'
                : 'Order created successfully',
            orderNumber: order.orderNumber,
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message:
                statusCode === 500 ? 'Internal server error' : error.message,
            code:
                error.code ||
                (statusCode === 500
                    ? 'INTERNAL_SERVER_ERROR'
                    : 'TICKET_CREATION_FAILED'),
        });
    }
};
