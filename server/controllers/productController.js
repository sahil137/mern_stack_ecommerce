import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';

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
    const resultPerPage = 5;
    const numberOfProducts = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({ success: true, products, numberOfProducts });
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

// Create review for product
export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  try {
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let total = 0;

    product.reviews.forEach((review) => {
      total += review.rating;
    });

    product.rating = total / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all reviews of a product
export const getProductReviews = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler('Product not Found'), 404);
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete review
export const deleteReview = async (req, res, next) => {
  const { productId } = req.query;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );
    let total = 0;
    reviews.forEach((review) => {
      total += review.rating;
    });

    let rating = 0;

    if (reviews.length === 0) {
      rating = 0;
    } else {
      rating = total / reviews.length;
    }
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
      productId,
      {
        reviews,
        rating,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
