import Cookie from "js-cookie";
import axios from 'axios';

import { environment } from '../environments/environments';
import { ShippingAddress } from '../models/shipping-address';
import { CartItem } from '../models/cart-item';
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

const clearCart = () => async (dispatch: any) => { 
  dispatch({
    type: Cart.CART_REMOVE_ALL
  });
}

const createShippingAddress = (shippingAddress: ShippingAddress) => async (dispatch: any) => {  
  dispatch({
    type: Cart.SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress
  });
}

const paymentAction = (body: { token: any, products: CartItem[] }) => async (dispatch: any, getState: any) => {
  const { userSignIn: { userInfo } } = getState();
  try {
    dispatch({ type: Cart.PAYMENT_REQUEST });
    const { data } = await axios.post(`${environment.prodUrl}/payments/payment`, body, {
      headers: {
        Authorization: 'Bearer' + userInfo.token
      }
    });
    dispatch({ type: Cart.PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Cart.PAYMENT_FAIL, error: 'Error Making payment' })
  }
}

export { addToCart, removeFromCart, clearCart, createShippingAddress, paymentAction };