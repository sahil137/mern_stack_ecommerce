import {
  CLEAR_ERRORS,
  USER_ORDER_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
} from '../../constants/orderConstants';

const userOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return {
        loading: true,
      };

    case USER_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case USER_ORDER_FAIL:
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

export default userOrderReducer;
