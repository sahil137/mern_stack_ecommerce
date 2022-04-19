import ErrorHandler from '../utils/errorHandler.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({ path: 'server/config/.env' });

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const myPayment = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      metadata: {
        company: 'Blinkart',
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    return next(ErrorHandler(error.message, 500));
  }
};
