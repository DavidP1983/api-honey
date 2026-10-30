import dotenv from 'dotenv';
dotenv.config();

export const getDeliveryPrice = (req, res) => {
    const deliveryPrice = Number(process.env.DELIVERY_PRICE);

    if (!Number.isFinite(deliveryPrice) || deliveryPrice < 0) {
        return res.status(500).json({
            code: 'INVALID_DELIVERY_PRICE_CONFIG',
            message: 'Invalid delivery price configuration',
        });
    }

    return res.status(200).json({ deliveryPrice });
};
