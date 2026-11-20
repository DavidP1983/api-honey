import { createSubscription } from '../repositories/backInStock.repository.js';

export const subscribeToBackInStock = async (data) => {
    const { email, productId } = data;
    return createSubscription(email, productId);
};
