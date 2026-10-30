import dotenv from 'dotenv';
import { sendCustomerEmail } from '../send-email/send-customer-email.service.js';
import { getSupportTicketTemplateData } from '../templates/support-ticket-template.js';
dotenv.config();

const TICKET_TEMPLATE_ID = 10100;

export async function sendSupportTicketEmail(ticketData) {
    const templateData = getSupportTicketTemplateData(ticketData);

    return sendCustomerEmail({
        email: process.env.SUPPORT_EMAIL,
        name: 'Support Team',
        subject: `New support ticket — ${ticketData.ticketNumber}`,
        templateId: TICKET_TEMPLATE_ID,
        templateData,
        type: 'support-ticket',
    });
}
