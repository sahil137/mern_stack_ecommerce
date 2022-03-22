import { combineReducers } from 'redux';
import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';

const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
});

export default reducer;
