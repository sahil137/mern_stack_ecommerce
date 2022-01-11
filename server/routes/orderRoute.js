import express from 'express';
import {
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  newOrder,
  updateOrder,
} from '../controllers/orderController.js';
import { isUserAuthenticated, userAuthRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/new', isUserAuthenticated, newOrder);
router.get('/orderDetails/:id', isUserAuthenticated, getSingleOrder);
router.get('/myOrders', isUserAuthenticated, getMyOrders);

router.get(
  '/admin/allOrders',
  isUserAuthenticated,
  userAuthRoles('admin'),
  getAllOrders
);

router.put(
  '/admin/order/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  updateOrder
);

router.delete(
  '/admin/order/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  deleteOrder
);

export default router;
