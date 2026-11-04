import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI is not defined');
}
const globalWithMongo = globalThis;

const clientPromise =
    globalWithMongo.mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== 'production') {
    globalWithMongo.mongoClientPromise = clientPromise;
}

export const getDatabase = async () => {
    const client = await clientPromise;

    return client.db('honey-platform');
};
