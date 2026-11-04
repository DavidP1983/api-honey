import express from 'express';
import { getCategories } from '../controllers/category.controller.js';
import { cacheResponse } from '../middlewares/cache.middleware.js';

const router = express.Router();

router.get('/categories', cacheResponse('categories', 3600), getCategories);

export default router;
