import Product from '../models/productModel.js';

// Create a product :: ADMIN
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Product has been successfully created',
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single product details
export const getProductDetails = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(500).json({
        success: true,
        message: 'Product not found',
      });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update product :: ADMIN
export const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = Product.findById(id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'Product not found',
      });
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete product :: ADMIN
export const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(500).json({
        success: true,
        message: 'Product not found',
      });
    }

    await product.remove();
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
