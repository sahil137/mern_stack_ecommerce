import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import userAuthReducer from './userAuthReducer';
import userProfileReducer from './userProfileReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import userOrderReducer from './userOrderReducer';
import orderDetailsReducer from './orderDetailsReducer';
import { newReviewReducer } from './productReviewReducer';

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  userAuthReducer,
  userProfileReducer,
  forgotPasswordReducer,
  cartReducer,
  orderReducer,
  userOrderReducer,
  orderDetailsReducer,
  newReviewReducer,
});

export default reducer;
