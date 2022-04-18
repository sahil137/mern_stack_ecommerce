import React, { useRef } from 'react';
import MetaData from '../Layout/MetaData';
import CheckoutBar from './CheckoutBar';

import '../../assets/css/payment.css';
import { Typography } from '@mui/material';
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import * as api from '../../api/index';
import { useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payButton = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  // const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.userAuthReducer);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const { user } = userState;
  const { name, email } = user;

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    payButton.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await api.processPayment(paymentData, config);

      const { data } = response;

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name,
            email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payButton.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          navigate('/success');
        } else {
          alert.error(
            'There is some issue with processing your payment please try again later'
          );
        }
      }
    } catch (error) {
      payButton.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutBar activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={handlePaymentSubmit}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            ref={payButton}
            type="submit"
            value={`Pay - Rs ${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
