import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import updateStock from '../utils/updateStock.js';

// create new order
export const newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    tax,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      tax,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res
      .status(201)
      .json({ success: true, message: 'Order Successfully created', order });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get details of a single order
export const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get orders of loggen in users
export const getMyOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all orders :: ADMIN
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update order status :: ADMIN
export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  // console.log(req);
  try {
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    if (order.status === 'Delivered') {
      return next(
        new ErrorHandler('You have already delivered this order', 400)
      );
    }
    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.product, orderItem.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete order :: ADMIN
export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
