import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, productDetailsReducer, sativaReducer, indicaListReducer } from './reducers/productReducer';
import { cartAddReducer } from './reducers/cartReducer';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  indicaList: indicaListReducer,
  sativaList: sativaReducer,
  cart: cartAddReducer,
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;