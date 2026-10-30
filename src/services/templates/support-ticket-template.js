export function getSupportTicketTemplateData(ticketData) {
    return {
        customerName: ticketData.customerName,
        customerEmail: ticketData.customerEmail,
        ticketNumber: ticketData.ticketNumber,
        orderNumber: ticketData.orderNumber,
        subject: ticketData.subject,
        comment: ticketData.comment,
        status: ticketData.status,
        createdAt: ticketData.createdAt.toISOString(),
    };
}
