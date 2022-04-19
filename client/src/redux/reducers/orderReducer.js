import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../../constants/orderConstants';

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        laoding: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        laoding: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        laoding: false,
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

export default orderReducer;
