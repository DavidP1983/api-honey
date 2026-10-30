export function getCustomerTicketTemplateData(ticketData) {
    return {
        customerName: ticketData.customerName,
        ticketNumber: ticketData.ticketNumber,
        orderNumber: ticketData.orderNumber,
        subject: ticketData.subject,
        comment: ticketData.comment,
        status: ticketData.status,
        createdAt: ticketData.createdAt.toISOString(),
    };
}
