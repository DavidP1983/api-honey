import express from 'express';
import { getDeliveryPrice } from '../controllers/delivery.controller.js';

const router = express.Router();

router.get('/delivery', getDeliveryPrice);

export default router;
