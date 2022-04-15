import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemsToCart,
  removeItemFromCart,
} from '../../redux/actions/cartAction';
import '../../assets/css/cart.css';
import CartItem from './CartItem';

import EmptyCart from './EmptyCart';

const Cart = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.cartReducer);

  const { cartItems } = data;

  console.log(cartItems);

  const handleIncreaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      alert.info('Max Quantity reached');
      return;
    }

    dispatch(addItemsToCart(id, newQty));
    alert.info('Quantity Updated');
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity === 1) {
      return;
    }
    const newQty = quantity - 1;

    dispatch(addItemsToCart(id, newQty));
    alert.info('Quantity Updated');
  };

  const handleDeleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {};

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItem item={item} deleteItem={handleDeleteCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    Rs {`${item.price * item.quantity}`}
                  </p>
                </div>
              ))}

            <div className="cartGrossProfit ">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Grand Total</p>
                <p>
                  Rs{' '}
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={handleCheckout}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
