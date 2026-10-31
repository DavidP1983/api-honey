import dotenv from 'dotenv';
import { getImageUrl } from '../../utils/getImageUrl.js';
dotenv.config();

export function getSellerOrderTemplateData(order, sellerOrder) {
    return {
        seller: {
            name: sellerOrder.items[0].sellerName,
        },
        customer: {
            name: order.customer.name,
            surname: order.customer.surname,
            email: order.customer.email,
            phone: order.customer.phone,
            address: {
                country: order.customer.address.country,
                city: order.customer.address.city,
                street: order.customer.address.street,
                apartment: order.customer.address.apartment,
                postalCode: order.customer.address.postalCode,
            },
            comment: order.customer.comment,
        },
        order: {
            orderNumber: order.orderNumber,
            productsTotal: sellerOrder.productsTotal,
            deliveryPrice: sellerOrder.deliveryPrice,
            totalPrice: sellerOrder.totalPrice,
            deliveryStatus: sellerOrder.deliveryStatus,
        },
        items: sellerOrder.items.map((item) => ({
            title: item.title,
            image:
                getImageUrl(item.image, 200) ??
                `${process.env.FRONTEND_URL}/images/placeholder-image.jpg`,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discountPercent: item.discountPercent,
            totalPrice: item.totalPrice,
            productUrl: `${process.env.FRONTEND_URL}/en/products/${item.productId}`,
        })),
    };
}
