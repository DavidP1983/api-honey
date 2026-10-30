import express from 'express';
import { createOrder } from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/orders', createOrder);

export default router;
