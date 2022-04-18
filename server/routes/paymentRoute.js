import express from 'express';
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js';
import { isUserAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/process', isUserAuthenticated, processPayment);
router.get('/getStripeApiKey', isUserAuthenticated, sendStripeApiKey);

export default router;
