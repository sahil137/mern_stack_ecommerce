import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Create a product :: ADMIN
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Product has been successfully created',
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// get all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// Get single product details
export const getProductDetails = async (req, res, next) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler('Product not Found', 404));
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// update product :: ADMIN
export const updateProduct = async (req, res, next) => {
  try {
    let id = req.params.id;
    let product = Product.findById(id);
    if (!product) {
      return next(new ErrorHandler('Product not found', 500));
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// Delete product :: ADMIN
export const deleteProduct = async (req, res, next) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler('Product not Found', 404));
    }

    await product.remove();
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
