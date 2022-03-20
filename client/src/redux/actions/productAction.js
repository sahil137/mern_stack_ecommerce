import * as api from '../../api';
import {
  GET_ALL_PRODUCTS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from '../../constants/productConstants';

// action to get list of all products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS });

    const { data } = await api.fetchAllProducts();

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
