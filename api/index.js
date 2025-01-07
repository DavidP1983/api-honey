const express = require('express');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectId;

require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGODB_URI;

let db = Db;
let products;

(async function connectToDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        db = client.db('honey');
        products = db.collection('allproducts');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();

app.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 16 } = req.query;

        const skip = (page - 1) * limit;

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


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
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

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});