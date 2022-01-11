import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getProductDetails,
  getProductReviews,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { isUserAuthenticated, userAuthRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductDetails);
router.put('/review', isUserAuthenticated, createProductReview);
router.get('/review/:id', getProductReviews);
router.delete('/review', isUserAuthenticated, deleteReview);
router.post(
  '/create',
  isUserAuthenticated,
  userAuthRoles('admin'),
  createProduct
);
router.patch(
  '/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  updateProduct
);
router.delete(
  '/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  deleteProduct
);

export default router;
