import { Router } from 'express';

import categoryRoutes from './category.routes.js';
import deliveryRoutes from './delivery.routes.js';
import ordersRoutes from './orders.routes.js';
import productRoutes from './product.routes.js';
import productReviewsRoutes from './review.routes.js';
import ticketsRoutes from './ticket.routes.js';

const router = Router();

router.use(productRoutes);
router.use(categoryRoutes);
router.use(productReviewsRoutes);
router.use(ordersRoutes);
router.use(deliveryRoutes);
router.use(ticketsRoutes);

export default router;
