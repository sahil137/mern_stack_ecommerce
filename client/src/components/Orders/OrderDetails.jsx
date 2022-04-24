import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/order_details.css';
import { clearErrors, getOrderDetails } from '../../redux/actions/orderActions';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';

const OrderDetails = () => {
  const orderState = useSelector((state) => state.orderDetailsReducer);
  const { order, error, loading } = orderState;
  console.log(orderState);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">
                  Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="detailsDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone: </p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNumber}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'greenColor'
                          : 'redColor'
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'PAID'
                        : 'NOT PAID'}
                    </p>
                  </div>
                  <div>
                    <p>Amount: </p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainer">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === 'Delivered'
                          ? 'greenColor'
                          : 'redColor'
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetialsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{' '}
                        <span>
                          {item.quantity} X ₹{item.price} ={' '}
                          <b>Rs {item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default OrderDetails;
