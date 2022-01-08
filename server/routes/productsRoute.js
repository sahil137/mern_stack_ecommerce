import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import isUserAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductDetails);

router.post('/create', isUserAuthenticated, createProduct);
router.patch('/:id', isUserAuthenticated, updateProduct);
router.delete('/:id', isUserAuthenticated, deleteProduct);

export default router;
