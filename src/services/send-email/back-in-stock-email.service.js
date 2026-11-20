import dotenv from 'dotenv';
import { sendCustomerEmail } from '../send-email/send-customer-email.service.js';
import { backInStockTemplateData } from '../templates/back-in-stock-template.js';
dotenv.config();

const BACK_IN_STOCK_TEMPLATE_ID = 10596;

export async function sendBackInStockEmail(
    subscription,
    product,
    productId,
    availableVariants,
) {
    const templateData = backInStockTemplateData(
        product,
        productId,
        availableVariants,
    );

    return sendCustomerEmail({
        email: subscription.email,
        name: 'Client',
        subject: `${product.title} is back in stock!`,
        templateId: BACK_IN_STOCK_TEMPLATE_ID,
        templateData,
        type: 'back-in-stock',
    });
}
