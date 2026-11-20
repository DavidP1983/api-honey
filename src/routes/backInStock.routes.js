import express from 'express';
import { backInStockController } from '../controllers/backInStock.controller.js';

const router = express.Router();

router.post('/back-in-stock', backInStockController);

export default router;
