import dotenv from 'dotenv';
dotenv.config();

export function getCustomerOrderTemplateData(order) {
    return {
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
        },
        order: {
            orderNumber: order.orderNumber,
            productsTotal: order.productsTotal,
            deliveryTotal: order.deliveryTotal,
            totalPrice: order.totalPrice,
        },
        items: order.items.map((item) => ({
            title: item.title,
            sellerName: item.sellerName,
            sellerEmail: item.sellerEmail,
            image:
                `${process.env.FRONTEND_URL}${item.image}` ||
                `${process.env.FRONTEND_URL}/images/placeholder-image.jpg`,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discountPercent: item.discountPercent,
            totalPrice: item.totalPrice,
            reviewUrl: `${process.env.FRONTEND_URL}/en/products/${item.productId}#reviews`,
        })),
    };
}
