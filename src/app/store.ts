import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import { productListReducer, productDetailsReducer, sativaReducer, indicaListReducer, productDeleteReducer, productUpdateReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userSignInReducer, userSignUpReducer } from './reducers/userReducer';
import { createNewProductReducer } from './reducers/newProductReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {  userSignIn: {userInfo}};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  indicaList: indicaListReducer,
  sativaList: sativaReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userSignUp: userSignUpReducer,
  newProductDetails: createNewProductReducer,
  productDeleted: productDeleteReducer,
  productUpdate: productUpdateReducer
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;