const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');

require('dotenv').config();

const app = express();

let db;
let client;
let products;

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


async function connectToDB() {
    try {
        client = new MongoClient(process.env.MONGODB_URI, {});
        await client.connect();
        db = client.db('honey');
        products = db.collection('allproducts');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.get('/api/products', async (req, res) => {
    try {
        if (!products) await connectToDB()
        const { page = 1, limit = 16 } = req.query;

        const skip = (page - 1) * limit;
        console.log(products)
        const result = await products
            .find({})
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .toArray();

        return res.status(200).json(result.map(product => ({ ...product, _id: product._id.toString() })));
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch products: ${error.message}` });
    }
});

app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!products) await connectToDB()
        // Проверяем валидность идентификатора
        if (!ObjectID.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Преобразуем строку в ObjectId
        const objectId = new ObjectID(id);

        // Ищем продукт в базе данных
        const product = await products.findOne({ _id: objectId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Возвращаем продукт, преобразовав `_id` обратно в строку
        return res.status(200).json({ ...product, _id: product._id.toString() });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/products/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const { name, city, comment, rating, title } = req.body;

    try {
        if (!products) await connectToDB();

        if (!ObjectID.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const objectId = new ObjectID(id);

        const newReview = {
            id: new ObjectID().toString(),
            name: name || '',
            city: city || '',
            comment: comment || '',
            rating: rating || '0',
            title: title || '',
            date: new Date().toISOString(),
        };

        const result = await products.updateOne(
            { _id: objectId },
            { $push: { reviews: newReview } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Product not found or not updated' });
        }

        return res.status(200).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


