import { CartItem } from './../models/cart-item';
import { Cart } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [] }, action: any) {
  switch (action.type) {
    case Cart.CART_ADD_ITEM:
      const item: CartItem = action.payload;
      return { cartItems: [...state.cartItems, item] };

    case Cart.CART_REMOVE_ITEM:
      const productId = action.payload;
      const filtered = state.cartItems.filter((x: CartItem) => x.id !== productId);      
      return { cartItems: filtered }
      
    default:
      return state;
  }
}
export { cartReducer}