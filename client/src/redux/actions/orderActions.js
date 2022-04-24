import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  USER_ORDER_FAIL,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
} from '../../constants/orderConstants';
import * as api from '../../api/index';

// create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await api.createNewOrder(order, config);

    const { data } = response;

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// User orders
export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST });

    const { data } = await api.getUserOrder();
    console.log(data);
    dispatch({ type: USER_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: USER_ORDER_FAIL, payload: error.response.data.message });
  }
};

// get user order Details

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await api.getOrderDetails(id);
    console.log(data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      paylaod: error.response.data.message,
    });
  }
};
