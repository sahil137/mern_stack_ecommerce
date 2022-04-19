import React from 'react';
import CheckoutBar from './CheckoutBar';
import MetaData from '../Layout/MetaData';
import { useSelector } from 'react-redux';
import '../../assets/css/confirm_order.css';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.userAuthReducer);
  const { cartItems } = cartState;
  const { user, loading } = userState;

  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
  console.log('User', userState);
  console.log('ShippingInfo', shippingInfo);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const gst = subTotal * 0.18;
  const totalPrice = subTotal + gst + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.country}`;

  const handleProceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      gst,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process-payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutBar activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name: </p>
                <span>{loading ? '' : user.name}</span>
              </div>
              <div>
                <p>Phone Number: </p>
                <span>{shippingInfo?.phoneNumber}</span>
              </div>
              <div>
                <p>Address </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items: </Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X Rs{item.price} ={' '}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summmary</Typography>
            <div>
              <div>
                <p>Subtotal: </p>
                <span>{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>{gst}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs {totalPrice}</span>
            </div>
            <button onClick={handleProceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
