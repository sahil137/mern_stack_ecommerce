import * as api from '../../api';
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_LIST_FAIL,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_NEW_PRODUCT_FAIL,
  ADMIN_NEW_PRODUCT_REQUEST,
  ADMIN_NEW_PRODUCT_SUCCESS,
} from '../../constants/productConstants';

// action to get list of all products
export const getProducts =
  (keyword = '', currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      const { data } = category
        ? await api.fetchAllProductsCategory(
            keyword,
            currentPage,
            price,
            category,
            rating
          )
        : await api.fetchAllProducts(keyword, currentPage, price, rating);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.message,
      });
    }
  };

// get product details request
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const { data } = await api.fetchProductDetails(id);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// new product review
export const newProductReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = { headers: { 'Content-type': 'application/json' } };
    const { data } = await api.newProductReview(reviewData, config);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

// get all products :: ADMIN
export const getAllProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_LIST_REQUEST });

    const { data } = await api.getAllProductsAdmin();
    console.log('data', data);

    dispatch({ type: ADMIN_PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// create new product :: ADMIN

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_NEW_PRODUCT_REQUEST });

    const config = { headers: { 'Content-type': 'application/json' } };

    const { data } = await api.createNewProduct(productData, config);

    console.log(data);

    dispatch({ type: ADMIN_NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_NEW_PRODUCT_FAIL });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
