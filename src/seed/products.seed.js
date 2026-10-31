import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

const products = [
    // Honey
    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',
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
        categoryId: '6ac679ab73b1fb9c17fc5852',
        title: 'Wildflower Honey',
        slug: 'wildflower-honey',
        description: {
            producer: 'Bienenhonig',
            color: 'Golden',
            origin: 'Erkrath-Hochdahl',
            text: 'Wildflower honey made from the nectar of various flowering plants. It has a rich floral aroma, a naturally sweet taste, and a flavour that reflects the diversity of seasonal blossoms. Its colour and texture may vary depending on the harvest and natural crystallisation.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'honey_vjmnw6',
                format: 'png',
                alt: 'Wildflower Honey',
            },
        ],
        variants: [
            {
                size: '250 g',
                price: 7.5,
                quantity: 20,
                discountPercent: 10,
            },
            {
                size: '500 g',
                price: 13,
                quantity: 0,
                discountPercent: 0,
            },
            {
                size: '1000 g',
                price: 24,
                quantity: 8,
                discountPercent: 0,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',
        contacts: [
            {
                type: 'whatsapp',
                value: 'https://wa.me/4915123456789',
            },
            {
                type: 'email',
                value: 'golden.honey@example.com',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5852',
        title: 'Spring Blossom Honey',
        slug: 'spring-blossom-honey',
        description: {
            producer: 'Bienenhonig',
            color: 'Light Gold',
            origin: 'Düsseldorf',
            text: 'Spring blossom honey with a delicate floral aroma and a light, sweet flavour. Collected during the spring flowering season, it offers a gentle taste that pairs well with tea, yoghurt, fresh fruit, and breakfast dishes.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'honey2_bcfuic',
                format: 'png',
                alt: 'Spring Blossom Honey',
            },
        ],
        variants: [
            {
                size: '250 g',
                price: 8,
                quantity: 0,
                discountPercent: 0,
            },
            {
                size: '500 g',
                price: 14,
                quantity: 0,
                discountPercent: 0,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'facebook',
                value: 'https://www.facebook.com/wildflower.honey',
            },
            {
                type: 'whatsapp',
                value: 'https://wa.me/4916012345678',
            },
            {
                type: 'telegram',
                value: 'https://t.me/wildflower_honey',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5852',
        title: 'Linden',
        slug: 'linden',
        description: {
            producer: 'Bienenhonig',
            color: 'Light Gold',
            origin: 'Düsseldorf',
            text: 'Linden honey is known for its distinctive floral aroma and refreshing herbal notes. Its balanced sweetness makes it a lovely addition to warm drinks, toast, and everyday meals. Colour and consistency can change naturally over time.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'honey3_bjtatb',
                format: 'png',
                alt: 'Linden',
            },
        ],
        variants: [
            {
                size: '250 g',
                price: 8,
                quantity: 0,
                discountPercent: 0,
            },
            {
                size: '500 g',
                price: 14,
                quantity: 10,
                discountPercent: 15,
            },
        ],
        isActive: true,

        createdAt: new Date(),
        updatedAt: new Date(),
    },

    // Honey Products
    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'email',
                value: 'bee.farm@example.com',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5853',
        title: 'Honey Cream',
        slug: 'honey-cream',
        description: {
            producer: 'Bienenhonig',
            color: 'Cream',
            origin: 'Erkrath',
            text: 'Creamed honey has a smooth, spreadable consistency created through controlled crystallisation. Its fine texture makes it easy to spread on bread, pancakes, and pastries without dripping. It offers the familiar sweetness of honey in a creamy form.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'products_cu4m6d',
                format: 'png',
                alt: 'Honey Cream',
            },
        ],
        variants: [
            {
                size: '250 g',
                price: 9,
                quantity: 14,
                discountPercent: 5,
            },
            {
                size: '500 g',
                price: 16,
                quantity: 9,
                discountPercent: 0,
                quantityDiscount: {
                    minQuantity: 3,
                    discountPercent: 10,
                },
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'telegram',
                value: 'https://t.me/bee_farm_shop',
            },
            {
                type: 'facebook',
                value: 'https://www.facebook.com/bee.farm.shop',
            },
            {
                type: 'email',
                value: 'bee.farm.shop@example.com',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5853',
        title: 'Honey Gift Box',
        slug: 'honey-gift-box',
        description: {
            producer: 'Bienenhonig',
            color: 'Golden',
            origin: 'Düsseldorf',
            text: 'A honey gift box presented for special occasions and thoughtful everyday gifts. It is a lovely choice for honey lovers, family celebrations, and seasonal surprises. Check the product images and available variants for the exact contents of the box.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'products2_f4l7y7',
                format: 'png',
                alt: 'Honey Gift Box',
            },
        ],
        variants: [
            {
                size: '500 g',
                price: 22,
                quantity: 7,
                discountPercent: 0,
            },
            {
                size: '1000 g',
                price: 38,
                quantity: 4,
                discountPercent: 10,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    // Bee Products
    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'whatsapp',
                value: 'https://wa.me/4917012345678',
            },
            {
                type: 'telegram',
                value: 'https://t.me/natural_honey_store',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5854',
        title: 'Natural Beeswax',
        slug: 'natural-beeswax',
        description: {
            producer: 'Bienenhonig',
            color: 'Yellow',
            origin: 'Erkrath',
            text: 'Natural beeswax is a versatile material produced by honeybees. It can be used for candle making, wax wraps, crafts, and a variety of beekeeping projects. Natural colour and texture may vary between batches.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'beeProducts_edss61',
                format: 'png',
                alt: 'Natural Beeswax',
            },
        ],
        variants: [
            {
                size: '100 g',
                price: 6,
                quantity: 20,
                discountPercent: 0,
                quantityDiscount: {
                    minQuantity: 3,
                    discountPercent: 10,
                },
            },
            {
                size: '250 g',
                price: 13,
                quantity: 11,
                discountPercent: 0,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'facebook',
                value: 'https://www.facebook.com/alpine.honey',
            },
            {
                type: 'email',
                value: 'alpine.honey@example.com',
            },
            {
                type: 'whatsapp',
                value: 'https://wa.me/4915111122233',
            },
            {
                type: 'telegram',
                value: 'https://t.me/alpine_honey',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5854',
        title: 'Pure Propolis',
        slug: 'pure-propolis',
        description: {
            producer: 'Bienenhonig',
            color: 'Dark Brown',
            origin: 'Düsseldorf',
            text: 'Propolis is a resinous substance that honeybees collect from plants and use within the hive. It has a characteristic aroma and a naturally variable colour. Check the product label for ingredients, intended use, and storage instructions.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'beeProducts2_rjox7j',
                format: 'png',
                alt: 'Pure Propolis',
            },
        ],
        variants: [
            {
                size: '50 g',
                price: 8,
                quantity: 16,
                discountPercent: 15,
            },
            {
                size: '100 g',
                price: 14,
                quantity: 10,
                discountPercent: 0,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    // Beekeeping
    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'facebook',
                value: 'https://www.facebook.com/meadow.bees',
            },
            {
                type: 'telegram',
                value: 'https://t.me/meadow_bees',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5855',
        title: 'Wooden Bee Frame',
        slug: 'wooden-bee-frame',
        description: {
            producer: 'Bienenhonig',
            color: 'Natural Wood',
            origin: 'Erkrath',
            text: 'A wooden bee frame designed to support the organisation of a beehive. It provides a structure for bees to build comb and is a practical component of beekeeping equipment. Check the product dimensions to ensure compatibility with your hive.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'beekeeping1_mlpk0r',
                format: 'png',
                alt: 'Wooden Bee Frame',
            },
        ],
        variants: [
            {
                size: '300 mm',
                price: 12,
                quantity: 25,
                discountPercent: 10,
            },
            {
                size: '400 mm',
                price: 16,
                quantity: 18,
                discountPercent: 0,
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        sellerId: 'seller-1',
        sellerName: 'seller-1',
        sellerEmail: 'email',

        contacts: [
            {
                type: 'whatsapp',
                value: 'https://wa.me/4915222233344',
            },
            {
                type: 'email',
                value: 'meadow.honey@example.com',
            },
            {
                type: 'facebook',
                value: 'https://www.facebook.com/meadow.honey.shop',
            },
        ],
        categoryId: '6ac679ab73b1fb9c17fc5855',
        title: 'Bee Smoker',
        slug: 'bee-smoker',
        description: {
            producer: 'Bienenhonig',
            color: 'Silver',
            origin: 'Düsseldorf',
            text: 'A bee smoker designed to produce smoke for use during hive inspections. When operated correctly, smoke can help beekeepers manage colonies more calmly during routine work. Follow the manufacturer’s instructions and all relevant fire-safety precautions.',
        },
        images: [
            {
                provider: 'cloudinary',
                publicId: 'beekeeping_lz12em',
                format: 'png',
                alt: 'Bee Smoker',
            },
        ],
        variants: [
            {
                size: 'Small',
                price: 28,
                quantity: 6,
                discountPercent: 0,
            },
            {
                size: 'Large',
                price: 35,
                quantity: 4,
                discountPercent: 0,
                quantityDiscount: {
                    minQuantity: 2,
                    discountPercent: 5,
                },
            },
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const seedProducts = async () => {
    const db = await getDatabase();

    await db.collection(COLLECTIONS.PRODUCTS).deleteMany({});
    await db.collection(COLLECTIONS.PRODUCTS).insertMany(products);

    console.log('Products seeded successfully');
};

seedProducts();
