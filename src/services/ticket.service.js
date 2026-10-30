import { ObjectId } from 'mongodb';
import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';
import {
    createTicket,
    findTicketByOrderAndEmail,
    updateTicketEmailStatuses,
} from '../repositories/ticket.repository.js';
import {
    retryFailedTicketEmails,
    sendTicketEmail,
} from './ticket-email.service.js';

export const createTicketService = async (ticketData) => {
    const { orderNumber, email } = ticketData;
    const db = await getDatabase();

    const order = await db
        .collection(COLLECTIONS.ORDERS)
        .findOne({ orderNumber });

    if (!order) {
        const error = new Error('Order is unavailable');

        error.statusCode = 404;
        error.code = 'ORDER_NOT_FOUND';
        throw error;
    }

    const customerEmail = order.customer?.email?.trim().toLowerCase();
    const requestEmail = email.trim().toLowerCase();

    if (!customerEmail || customerEmail !== requestEmail) {
        const error = new Error('Order is unavailable');

        error.statusCode = 404;
        error.code = 'ORDER_NOT_FOUND';
        throw error;
    }

    /* Проверяем, существует ли тикет */
    const existingTicket = await findTicketByOrderAndEmail(
        orderNumber,
        requestEmail,
    );

    if (existingTicket) {
        /*  Повторно отправляем только письма со статусом failed */
        const emailStatuses = await retryFailedTicketEmails(existingTicket);

        /* Обновляем только статусы писем, которые повторно отправляли */
        if (Object.keys(emailStatuses).length > 0) {
            await updateTicketEmailStatuses(existingTicket._id, emailStatuses);
        }

        return {
            ticketNumber: existingTicket.ticketNumber,
            status: existingTicket.status,
            ...emailStatuses,
            order: {
                orderNumber: order.orderNumber,
                paymentStatus: order.paymentStatus,
                productsTotal: order.productsTotal,
                deliveryTotal: order.deliveryTotal,
                totalPrice: order.totalPrice,
            },
            message:
                'Your request has been received. Our support team will review it.',
        };
    }

    const now = new Date();

    const newTicketData = {
        ticketNumber: `SUP-${new ObjectId()
            .toHexString()
            .slice(-8)
            .toUpperCase()}`,
        orderId: order._id,
        orderNumber: order.orderNumber,
        customerName: `${order.customer.name} ${order.customer.surname}`,
        customerEmail: requestEmail,
        subject: ticketData.subject,
        comment: ticketData.comment,
        status: 'open',
        customerEmailStatus: 'pending',
        supportEmailStatus: 'pending',
        createdAt: now,
        updatedAt: now,
    };

    const ticket = await createTicket(newTicketData);
    const emailStatuses = await sendTicketEmail(newTicketData);
    await updateTicketEmailStatuses(ticket._id, emailStatuses);

    return {
        ticketNumber: ticket.ticketNumber,
        status: ticket.status,
        ...emailStatuses,
        order: {
            orderNumber: order.orderNumber,
            paymentStatus: order.paymentStatus,
            productsTotal: order.productsTotal,
            deliveryTotal: order.deliveryTotal,
            totalPrice: order.totalPrice,
        },
        message:
            'Your request has been received. Our support team will review it.',
    };
};
