import { sendMail } from '../maileroo.service.js';

export async function sendCustomerEmail({
    email,
    name,
    subject,
    templateId,
    templateData,
    type,
}) {
    try {
        const result = await sendMail({
            to: email,
            name,
            subject,
            template_id: templateId,
            template_data: templateData,
        });

        return {
            success: true,
            recipient: email,
            type,
            result,
        };
    } catch (error) {
        console.error(`[Customer Email] Failed to send ${type}:`, error);

        return {
            success: false,
            recipient: email,
            type,
            error: {
                message: error.message,
                code: error.code,
            },
        };
    }
}
