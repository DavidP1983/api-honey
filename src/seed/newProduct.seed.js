import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

const newProduct =
    // Honey
    {
        sellerId: 'seller-10',
        sellerName: 'seller-10',
        sellerEmail: 'dav.mtr83@gmail.com',
        contacts: [
            {
                type: 'facebook',
                value: 'https://www.facebook.com/honey.garden',
            },
            {
                type: 'telegram',
                value: 'https://t.me/honey_garden',
            },
        ],
        categoryId: '6ae1d2505cf8ff90235de060',
        title: 'Meadow Blossom Honey',
        slug: 'meadow-blossom-honey',
        description: {
            producer: 'Honey-World',
            color: 'Golden Amber',
            origin: 'Erkrath-Hochdahl',
            text: 'A naturally sweet honey collected from the nectar of various wildflowers and meadow blossoms. It features a delicate floral aroma, a smooth texture, and a well-balanced sweetness. Its colour and consistency may vary depending on the season, harvest conditions, and natural crystallisation.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'honey4_rsggbs',
                format: 'png',
                alt: 'meadow-blossom-honey',
            },
        ],
        variants: [
            {
                size: '250 g',
                price: 8.5,
                quantity: 20,
                discountPercent: 0,
            },
            {
                size: '500 g',
                price: 15,
                quantity: 0,
                discountPercent: 5,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

const seedNewProducts = async () => {
    const db = await getDatabase();

    await db.collection(COLLECTIONS.PRODUCTS).insertOne(newProduct);

    console.log('New Product seeded successfully');
};

seedNewProducts();
