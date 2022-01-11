import Product from '../models/productModel.js';
import ErrorHandler from './errorHandler.js';

const updateStock = async (id, quantity) => {
  try {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export default updateStock;
