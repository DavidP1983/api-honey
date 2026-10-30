import { COLLECTIONS } from '../config/collections.js';
import { getDatabase } from '../config/mongodb.js';

export const reviewsSeed = [
    {
        productId: '6ace5e26ac7b77187490094b',
        name: 'Anna Müller',
        city: 'Berlin',
        title: 'Excellent honey',
        rating: 5,
        comment:
            'Wonderful natural honey with a rich taste. I will definitely order again.',
    },
    {
        productId: '6ace5e26ac7b77187490094c',
        name: 'Thomas Weber',
        city: 'Munich',
        title: 'Very good quality',
        rating: 5,
        comment:
            'The honey tastes fresh and authentic. The texture is excellent.',
    },
    {
        productId: '6ace5e26ac7b77187490094d',
        name: 'Sophie Schneider',
        city: 'Hamburg',
        title: 'Delicious and natural',
        rating: 4.5,
        comment:
            'Lovely floral aroma and a pleasant sweetness. Highly recommended.',
    },
    {
        productId: '6ace5e26ac7b77187490094e',
        name: 'Lukas Fischer',
        city: 'Frankfurt',
        title: 'A great purchase',
        rating: 5,
        comment: 'Exactly what I expected. Great taste and careful packaging.',
    },
    {
        productId: '6ace5e26ac7b77187490094f',
        name: 'Emma Wagner',
        city: 'Cologne',
        title: 'Amazing flavour',
        rating: 4,
        comment: 'Very tasty honey. I enjoy it with tea and fresh bread.',
    },
    {
        productId: '6ace5e26ac7b771874900950',
        name: 'Daniel Becker',
        city: 'Stuttgart',
        title: 'Authentic honey',
        rating: 5,
        comment:
            'You can really appreciate the natural flavour. I am very satisfied.',
    },
    {
        productId: '6ace5e26ac7b771874900951',
        name: 'Laura Hoffmann',
        city: 'Dresden',
        title: 'Good everyday honey',
        rating: 4,
        comment:
            'A pleasant taste and good consistency. Perfect for breakfast.',
    },
    {
        productId: '6ace5e26ac7b771874900952',
        name: 'Michael Schulz',
        city: 'Leipzig',
        title: 'Better than supermarket honey',
        rating: 5,
        comment:
            'The flavour is richer than ordinary store-bought honey. Great product.',
    },
    {
        productId: '6ace5e26ac7b771874900953',
        name: 'Julia Fischer',
        city: 'Bremen',
        title: 'Highly recommended',
        rating: 4.5,
        comment:
            'Delicious honey with a beautiful aroma. I would happily buy it again.',
    },
];

const seedReviews = async () => {
    const db = await getDatabase();

    await db.collection(COLLECTIONS.REVIEWS).deleteMany({});
    await db.collection(COLLECTIONS.REVIEWS).insertMany(reviewsSeed);

    console.log('Reviews seeded successfully');
};

seedReviews();
