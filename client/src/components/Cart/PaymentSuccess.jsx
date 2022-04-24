import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/payment_success.css';

const PaymentSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />
      <Typography>Your Order has been placed Successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default PaymentSuccess;
