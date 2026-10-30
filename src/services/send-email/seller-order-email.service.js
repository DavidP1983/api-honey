import { sendMail } from '../maileroo.service.js';
import { getSellerOrderTemplateData } from '../templates/seller-order-template.js';

const ORDER_TEMPLATE_ID = 10059;

export async function sendSellerOrderEmail(order, sellerOrder) {
    const { sellerId, items } = sellerOrder;
    const [seller] = items;

    try {
        const templateData = getSellerOrderTemplateData(order, sellerOrder);

        const isPaymentConfirmed = order.paymentStatus === 'paid';
        const orderSubject = isPaymentConfirmed
            ? `Payment confirmed — Order ${order.orderNumber}`
            : `New order — ${order.orderNumber}`;

        const templateId = isPaymentConfirmed ? '' : ORDER_TEMPLATE_ID;

        const result = await sendMail({
            to: seller.sellerEmail,
            name: seller.sellerName,
            subject: orderSubject,
            template_id: templateId,
            template_data: templateData,
        });

        return {
            success: true,
            recipient: seller.sellerEmail,
            sellerId: sellerId.toString(),
            type: 'seller',
            result,
        };
    } catch (error) {
        console.error('[Order Email][Seller] Failed to send confirmation:', {
            orderNumber: order.orderNumber,
            sellerId: seller,
            recipient: seller.sellerEmail,
            error,
        });

        return {
            success: false,
            recipient: seller.sellerEmail,
            sellerId: sellerId.toString(),
            type: 'seller',
            error: {
                message: error.message,
                code: error.code,
            },
        };
    }
}
