import Product from '../models/productModel.js';

// Create a product

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Product has been successfully created',
    product,
  });
};

export const getProducts = async (req, res) => {
  res.status(200).json({ message: 'Route is working' });
};
