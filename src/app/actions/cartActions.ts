import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import Cookie from "js-cookie";
import axios from 'axios';
import { Cart } from '../constants/cartConstants';

const addToCart = (productId: string, quantity: number) => async (dispatch: any, getState: any) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    const payload: CartItem = {
      id: data._id,
      title: data.title,
      source: data.source,
      price: data.price,
      quantity,
    }
    
    dispatch({
      type: Cart.CART_ADD_ITEM,
      payload,
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