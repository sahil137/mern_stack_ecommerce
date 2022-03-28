import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import userAuthReducer from './userAuthReducer';

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  userAuthReducer,
});

export default reducer;
