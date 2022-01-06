import express from 'express';
import productsRoute from './productsRoute.js';

const router = express.Router();

router.use('api/v1/products', productsRoute);

export default router;
