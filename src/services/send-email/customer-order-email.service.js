import { sendCustomerEmail } from '../send-email/send-customer-email.service.js';
import { getCustomerOrderTemplateData } from '../templates/customer-order-template.js';

const ORDER_TEMPLATE_ID = 10056;

export async function sendCustomerOrderEmail(order) {
    const templateData = getCustomerOrderTemplateData(order);

    return sendCustomerEmail({
        email: order.customer.email,
        name: `${order.customer.name} ${order.customer.surname}`,
        subject: `Order confirmation — ${order.orderNumber}`,
        templateId: ORDER_TEMPLATE_ID,
        templateData,
        type: 'customer-order',
    });
}
