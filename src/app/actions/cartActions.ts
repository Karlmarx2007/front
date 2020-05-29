import { CartItem } from './../models/cart-item';
import Cookie from "js-cookie";
import axios from 'axios';
import { Cart } from '../constants/cartConstants';

const addToCart = (cartItem: CartItem) => async (dispatch: any, getState: any) => {
  try {
    
    dispatch({
      type: Cart.CART_ADD_ITEM,
      payload: cartItem,
    });
    
    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

  } catch (error) {
    console.log(error);
    
  }
}

const removeFromCart = (productId: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: Cart.CART_REMOVE_ITEM,
      payload: productId
    });
    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
}

export { addToCart, removeFromCart };