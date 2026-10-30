import { sendCustomerEmail } from '../send-email/send-customer-email.service.js';
import { getCustomerTicketTemplateData } from '../templates/customer-ticket-template.js';

const TICKET_TEMPLATE_ID = 10094;

export async function sendCustomerTicketEmail(ticketData) {
    const templateData = getCustomerTicketTemplateData(ticketData);

    return sendCustomerEmail({
        email: ticketData.customerEmail,
        name: ticketData.customerName,
        subject: `Ticket confirmation — ${ticketData.orderNumber}`,
        templateId: TICKET_TEMPLATE_ID,
        templateData,
        type: 'customer-ticket',
    });
}
