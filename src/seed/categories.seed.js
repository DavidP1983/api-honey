import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

const categories = [
    {
        name: {
            en: 'Honey',
            ru: 'Мёд',
        },
        slug: 'honey',
        description: {
            en: 'Discover our selection of natural honey.',
            ru: 'Откройте для себя наш ассортимент натурального мёда.',
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: {
            en: 'Honey Products',
            ru: 'Медовая продукция',
        },
        slug: 'honey-products',
        description: {
            en: 'Explore delicious products made with honey.',
            ru: 'Откройте для себя разнообразие вкусных продуктов на основе мёда.',
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: {
            en: 'Bee Products',
            ru: 'Продукты пчеловодства',
        },
        slug: 'bee-products',
        description: {
            en: 'Discover natural products from the beehive, including beeswax, propolis, and bee pollen.',
            ru: 'Откройте для себя натуральные продукты пчеловодства, включая пчелиный воск, прополис и пыльцу.',
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: {
            en: 'Beekeeping',
            ru: 'Всё для пчеловодства',
        },
        slug: 'beekeeping',
        description: {
            en: 'Find useful tools and supplies for beekeeping.',
            ru: 'Всё необходимое для ухода за пчёлами и работы на пасеке.',
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const seedCategories = async () => {
    const db = await getDatabase();

    await db.collection(COLLECTIONS.CATEGORIES).deleteMany({});
    await db.collection(COLLECTIONS.CATEGORIES).insertMany(categories);

    console.log('Categories seeded successfully');
};

seedCategories();
