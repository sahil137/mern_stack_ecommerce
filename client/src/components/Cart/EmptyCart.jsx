import { RemoveShoppingCart } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/cart.css';

const EmptyCart = () => {
  return (
    <div className="emptyCart">
      <RemoveShoppingCart />
      <Typography>Your cart is Empty!! Lets fix that</Typography>
      <Link to="/products">Browse Products</Link>
    </div>
  );
};

export default EmptyCart;
