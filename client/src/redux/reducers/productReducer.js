import {
  GET_ALL_PRODUCTS,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from '../../constants/productConstants';

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        products: [],
        loading: true,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.numberOfProducts,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default productReducer;
