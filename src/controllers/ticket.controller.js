import { createTicketSchema } from '../schemas/ticket.schema.js';
import { createTicketService } from '../services/ticket.service.js';

export const createTicket = async (req, res) => {
    try {
        const validation = createTicketSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: 'Invalid ticket data',
                code: 'VALIDATION_ERROR',
            });
        }

        const ticket = await createTicketService(validation.data);

        return res.status(201).json(ticket);
    } catch (error) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message:
                statusCode === 500 ? 'Internal server error' : error.message,
            code: error.code || 'INTERNAL_SERVER_ERROR',
        });
    }
};
