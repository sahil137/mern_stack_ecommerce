import * as api from '../../api/index';

import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
} from '../../constants/cartConstants';

// add items to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await api.addItemsToCart(id);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

// remove item from cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM_FROM_CART, payload: id });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

// save shipping info

export const saveShippingInfo = (info) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: info });

  localStorage.setItem('shippingInfo', JSON.stringify(info));
};
