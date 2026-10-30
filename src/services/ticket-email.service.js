import { sendCustomerTicketEmail } from './send-email/customer-ticket-email.service.js';
import { sendSupportTicketEmail } from './send-email/support-ticket-email.service.js';

export async function sendTicketEmail(ticketData) {
    const emailTasks = [
        sendCustomerTicketEmail(ticketData),
        sendSupportTicketEmail(ticketData),
    ];
    const results = await Promise.allSettled(emailTasks);

    const getStatus = (result) => {
        if (result.status === 'fulfilled' && result.value.success) {
            return 'sent';
        }

        return 'failed';
    };

    for (const result of results) {
        if (result.status === 'rejected') {
            console.error('[Ticket Email] Unexpected error:', result.reason);
            continue;
        }

        const email = result.value;

        if (!email.success) {
            console.error(
                `[Ticket Email] ${email.type}: ${email.recipient} — ${email.error.message} (${email.error.code})`,
            );
        }
    }

    return {
        customerEmailStatus: getStatus(results[0]),
        supportEmailStatus: getStatus(results[1]),
    };
}

/* Повторная отправка письма при неудаче */
export async function retryFailedTicketEmails(ticket) {
    const statuses = {};

    if (ticket.customerEmailStatus === 'failed') {
        const result = await sendCustomerTicketEmail(ticket);
        statuses.customerEmailStatus = result.success ? 'sent' : 'failed';
    }

    if (ticket.supportEmailStatus === 'failed') {
        const result = await sendSupportTicketEmail(ticket);
        statuses.supportEmailStatus = result.success ? 'sent' : 'failed';
    }
    console.log('retryFailedTicketEmails', statuses);

    return statuses;
}
