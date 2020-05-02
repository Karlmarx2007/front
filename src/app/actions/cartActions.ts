import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import axios from 'axios';
import { Cart } from '../constants/cartConstants';

const addToCart = (productId: string, quantity: number) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    const payload: CartItem = {
      id: data.id,
      title: data.title,
      source: data.source,
      price: quantity === 3.5 ? data.price['3.5'] : data.price[quantity],
      quantity,
    }
    
    dispatch({
      type: Cart.CART_ADD_ITEM,
      payload,
    })
  } catch (error) {
    console.log(error);
    
  }
}

const removeFromCart = (productId: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: Cart.CART_REMOVE_ITEM,
      payload: productId
    })
  } catch (error) {
    console.log(error);
  }
}

export { addToCart, removeFromCart };