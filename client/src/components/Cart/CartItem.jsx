import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/cart.css';

const CartItem = (props) => {
  const { item, deleteItem } = props;

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p onClick={() => deleteItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItem;
