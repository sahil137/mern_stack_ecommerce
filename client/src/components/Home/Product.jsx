import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = (props) => {
  const { product } = props;

  console.log(product);

  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    value: product.rating,
    isHalf: true,
    size: 20,
  };

  return (
    <Link className="product-card" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div className="stars-container">
        <ReactStars {...options} /> <span>{product.numOfReviews} reviews</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default Product;
