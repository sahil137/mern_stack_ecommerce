import express from 'express';
import productsRoute from './productsRoute.js';
import userRoute from './userRoute.js';
import orderRoute from './orderRoute.js';

const router = express.Router();

router.use('/api/v1/products', productsRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/orders', orderRoute);
export default router;
