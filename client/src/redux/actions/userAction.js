import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
} from '../../constants/userConstants';

import * as api from '../../api/index';

// login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const formData = {
      email,
      password,
    };

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await api.loginUser(formData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// register user

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await api.registerUser(userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

// clearing errors

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
