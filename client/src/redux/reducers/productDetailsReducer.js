import {
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_REQUEST,
  CLEAR_ERRORS,
} from '../../constants/productConstants';

const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCTS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export default productDetailsReducer;
