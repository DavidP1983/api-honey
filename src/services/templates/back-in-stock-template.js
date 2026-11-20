import dotenv from 'dotenv';
import { getImageUrl } from '../../utils/getImageUrl.js';
dotenv.config();

export function backInStockTemplateData(product, productId, availableVariants) {
    return {
        productTitle: product.title,
        productUrl: `${process.env.FRONTEND_URL}/en/products/${productId}`,
        productImage:
            getImageUrl(product.images?.[0], 200) ??
            `${process.env.FRONTEND_URL}/images/placeholder-image.jpg`,
        variants: availableVariants.map((variant) => ({
            size: variant.size,
            price: variant.price,
            quantity: variant.quantity,
        })),
    };
}
