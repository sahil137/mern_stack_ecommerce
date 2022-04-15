import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import userAuthReducer from './userAuthReducer';
import userProfileReducer from './userProfileReducer';
import { forgotPasswordReducer } from './forgotPasswordReducer';

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  userAuthReducer,
  userProfileReducer,
  forgotPasswordReducer,
});

export default reducer;
