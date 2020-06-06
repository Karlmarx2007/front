import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import { productListReducer, productDetailsReducer, sativaReducer, indicaListReducer, productDeleteReducer, productUpdateReducer, rollsReducer, edibleReducer } from './reducers/product-reducer';
import { cartReducer } from './reducers/cart-reducer';
import { userSignInReducer } from './reducers/user-reducer';
import { createNewProductReducer } from './reducers/new-product-reducer';
import { searchReducer } from './reducers/search-reducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState: any = { cart: {cartItems}, userSignIn: {userInfo}};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  indicaList: indicaListReducer,
  sativaList: sativaReducer,
  edibleList: edibleReducer,
  rollsList: rollsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  newProductDetails: createNewProductReducer,
  productDeleted: productDeleteReducer,
  productUpdate: productUpdateReducer,
  searchWord: searchReducer,
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;