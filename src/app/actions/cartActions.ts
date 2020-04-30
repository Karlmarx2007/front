import { Product } from './../models/product';
import axios from 'axios';
import { CartAdd } from '../constants/cartConstants';

const addToCart = (productId: string, quantity: number) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    const payload = {
      id: data.id,
      title: data.title,
      source: data.source,
      price: quantity === 3.5 ? data.price['3.5'] : data.price[quantity],
      quantity,
    }
    
    dispatch({
      type: CartAdd.CART_ADD_ITEM,
      payload,
    })
  } catch (error) {
    
  }
}

export { addToCart };