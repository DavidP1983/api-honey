import { sendCustomerOrderEmail } from './send-email/customer-order-email.service.js';
import { sendSellerOrderEmail } from './send-email/seller-order-email.service.js';

export async function sendOrderEmails(order) {
    try {
        const emailTasks = [
            sendCustomerOrderEmail(order),
            ...order.sellerOrders.map((sellerOrder) =>
                sendSellerOrderEmail(order, sellerOrder),
            ),
        ];

        const results = await Promise.allSettled(emailTasks);

        for (const result of results) {
            if (result.status === 'rejected') {
                console.error('[Order Email] Unexpected error:', result.reason);
                continue;
            }

            const email = result.value;

            if (!email.success) {
                console.error(
                    `[Order Email] ${email.type}: ${email.recipient} — ${email.error.message} (${email.error.code})`,
                );
            }
        }
    } catch (error) {
        console.error('[Order Email] Failed to process order emails:', error);
    }
}
