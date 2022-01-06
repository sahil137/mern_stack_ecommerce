import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter the product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Enter the product description'],
    },
    price: {
      type: Number,
      required: [true, 'Enter Product price'],
      maxlength: [8, 'Price cannot exceed 8 characters'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    // images are array of object
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Enter product Category'],
    },
    stock: {
      type: Number,
      required: [true, 'Enter product stock'],
      maxlength: [4, 'Connot exceed 4 characters'],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
