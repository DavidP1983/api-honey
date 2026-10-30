import dotenv from 'dotenv';
dotenv.config();

export async function sendMail({
    to,
    name,
    subject,
    template_id,
    template_data,
    tracking = true,
}) {
    const apiKey = process.env.MAILEROO_API_KEY;
    const from = process.env.MAILEROO_FROM;

    if (!apiKey || !from) {
        const error = new Error(
            'Email service is not configured. Please try again later.',
        );

        error.statusCode = 500;
        error.code = 'EMAIL_SERVICE_NOT_CONFIGURED';

        throw error;
    }

    const response = await fetch(
        `https://smtp.maileroo.com/api/v2/emails/template`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: {
                    address: from,
                    display_name: 'Bienenhonig Honey',
                },
                to: [{ address: to, display_name: name }],
                subject,
                template_id,
                template_data,
                tracking,
            }),
        },
    );

    const result = await response.json().catch(() => {});
    if (!response.ok) {
        console.error('Maileroo HTTP status:', response.status);
        console.error('Maileroo response:', result);
        const error = new Error(
            'The email could not be sent. Please try again later.',
        );

        error.statusCode = 502;
        error.code = 'EMAIL_SENDING_FAILED';

        throw error;
    }

    return result;
}
