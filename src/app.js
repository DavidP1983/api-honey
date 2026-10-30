import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/index.js';

const app = express();

const corsOptions = {
    origin: ['https://bienenhonig.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Idempotency-Key', 'Authorization'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', apiRoutes);

export default app;
