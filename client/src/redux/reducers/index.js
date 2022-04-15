import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import userAuthReducer from './userAuthReducer';
import userProfileReducer from './userProfileReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import cartReducer from './cartReducer';

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  userAuthReducer,
  userProfileReducer,
  forgotPasswordReducer,
  cartReducer,
});

export default reducer;
