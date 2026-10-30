import dotenv from 'dotenv';
import app from './app.js';
import { createIndexes } from './config/indexes.js';
import { getDatabase } from './config/mongodb.js';
dotenv.config();

const PORT = process.env.PORT || 7000;

const startServer = async () => {
    try {
        await getDatabase();
        await createIndexes();

        app.listen(PORT, (error) => {
            if (error) {
                console.error('Failed to start server:', error);
                process.exitCode = 1;
                return;
            }

            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exitCode = 1;
    }
};

startServer();
