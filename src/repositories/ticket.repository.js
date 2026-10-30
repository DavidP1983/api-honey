import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const createTicket = async (ticketData) => {
    const db = await getDatabase();

    const result = await db
        .collection(COLLECTIONS.TICKETS)
        .insertOne(ticketData);

    return {
        ...ticketData,
        _id: result.insertedId,
    };
};

export const findTicketByOrderAndEmail = async (orderNumber, email) => {
    const db = await getDatabase();

    return db.collection(COLLECTIONS.TICKETS).findOne({
        orderNumber,
        customerEmail: email,
    });
};

export const updateTicketEmailStatuses = async (ticketId, statuses) => {
    const db = await getDatabase();

    const $set = {
        updatedAt: new Date(),
    };

    if (statuses.customerEmailStatus !== undefined) {
        $set.customerEmailStatus = statuses.customerEmailStatus;
    }

    if (statuses.supportEmailStatus !== undefined) {
        $set.supportEmailStatus = statuses.supportEmailStatus;
    }

    return db
        .collection(COLLECTIONS.TICKETS)
        .updateOne({ _id: ticketId }, { $set });
};
