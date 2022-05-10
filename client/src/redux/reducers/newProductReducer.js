import {
  ADMIN_NEW_PRODUCT_FAIL,
  ADMIN_NEW_PRODUCT_REQUEST,
  ADMIN_NEW_PRODUCT_RESET,
  ADMIN_NEW_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from '../../constants/productConstants';

const newProductReducer = (state = { product: {} }, action) => {
  switch (action.payload) {
    case ADMIN_NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case ADMIN_NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
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

export default newProductReducer;
