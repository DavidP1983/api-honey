import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI is not defined');
}
const globalWithMongo = globalThis;

console.log('MongoDB connection attempt');
const clientPromise =
    globalWithMongo.mongoClientPromise ?? new MongoClient(uri).connect();

clientPromise.then(
    () => {
        console.log('MongoDB connected successfully');
    },
    (error) => {
        console.error('MongoDB connection failed:', error.message);

        const servers = error.reason?.servers;

        if (servers) {
            for (const [address, server] of servers) {
                console.error('MongoDB server details:', {
                    address,
                    type: server.type,
                    error: server.error?.message,
                    code: server.error?.code,
                });
            }
        }
    },
);
if (process.env.NODE_ENV !== 'production') {
    globalWithMongo.mongoClientPromise = clientPromise;
}

export const getDatabase = async () => {
    const client = await clientPromise;

    return client.db('honey-platform');
};
