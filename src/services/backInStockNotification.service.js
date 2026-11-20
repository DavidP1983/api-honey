import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';
import { sendBackInStockEmail } from '../services/send-email/back-in-stock-email.service.js';

export const backInStockNotification = async (products) => {
    const db = await getDatabase();

    const subscriptionsCollection = db.collection(
        COLLECTIONS.BACK_IN_STOCK_SUBSCRIPTIONS,
    );

    const pendingSubscriptions = await subscriptionsCollection
        .find({
            status: 'pending',
        })
        .toArray();

    for (const product of products) {
        const availableVariants = product.variants.filter(
            (variant) => variant.quantity > 0,
        );

        if (!availableVariants.length) continue;

        const subscriptions = pendingSubscriptions.filter(
            (subscription) =>
                subscription.productId.toString() === product._id.toString(),
        );

        for (const subscription of subscriptions) {
            try {
                const productId = product._id.toString();

                const result = await sendBackInStockEmail(
                    subscription,
                    product,
                    productId,
                    availableVariants,
                );

                if (!result.success) {
                    console.error(
                        `Email was not sent to ${subscription.email}:`,
                        result.error,
                    );

                    continue;
                }

                await subscriptionsCollection.updateOne(
                    {
                        _id: subscription._id,
                        status: 'pending',
                    },
                    {
                        $set: {
                            status: 'received',
                            notifiedAt: new Date(),
                        },
                    },
                );
                console.log(`Email successfully sent to ${subscription.email}`);
            } catch (error) {
                console.error(
                    `Failed to notify ${subscription.email} about product ${product._id}:`,
                    error,
                );
            }
        }
    }
};
