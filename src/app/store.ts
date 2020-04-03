import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer } from './reducers/productReducer';
import thunk from 'redux-thunk';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
});

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;