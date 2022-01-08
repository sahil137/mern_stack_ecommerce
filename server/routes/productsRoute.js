import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { isUserAuthenticated, userAuthRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductDetails);

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
