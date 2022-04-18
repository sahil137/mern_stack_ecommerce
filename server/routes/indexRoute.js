import express from 'express';
import productsRoute from './productsRoute.js';
import userRoute from './userRoute.js';
import orderRoute from './orderRoute.js';
import paymentRoute from './paymentRoute.js';
const router = express.Router();

router.use('/api/v1/products', productsRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/orders', orderRoute);
router.use('/api/v1/payment', paymentRoute);

export default router;
