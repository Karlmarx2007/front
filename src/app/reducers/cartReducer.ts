import { CartItem } from './../models/cart-item';
import { Cart } from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shippingAddress: {} }, action: any) {
  switch (action.type) {
    case Cart.CART_ADD_ITEM:
      const item: CartItem = action.payload;
      const cartItems = state.cartItems;      
      const similarItemInCart: CartItem | undefined = cartItems.find((i: CartItem) => i.id === item.id);
     
      if (!similarItemInCart) {
        return { cartItems: [...state.cartItems, item] };
      }

      const newItem: CartItem = {
        ...similarItemInCart as CartItem,
        quantity: item.quantity + (similarItemInCart as CartItem).quantity,
        price: item.price + (similarItemInCart as CartItem).price
      }

      return { cartItems: cartItems.map((cartItem: CartItem) => cartItem.id === newItem.id ? newItem : cartItem)}

    case Cart.CART_REMOVE_ITEM:
      const productId = action.payload;
      const filtered = state.cartItems.filter((x: CartItem) => x.id !== productId);
      return { cartItems: filtered };
    
    case Cart.CART_REMOVE_ALL:
      return { cartItems: [] };
    
    case Cart.SAVE_SHIPPING_ADDRESS:      
      return { ...state, shippingAddress: action.payload }
    default:
      return state;
  }
}
export { cartReducer}