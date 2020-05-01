import { CartAdd } from "../constants/cartConstants";

export function cartAddReducer(state = { cartItems: [] }, action: any) {
  switch (action.type) {
    case CartAdd.CART_ADD_ITEM:
      const item = action.payload;      
      const product: any = state.cartItems.find((x: any) => x.id === item.id)
      // if (product) {
      //   console.log('yes Product > ', { cartItems: state.cartItems.map((x: any) => x.id === product.id ? product : x) });
      //   return { cartItems: state.cartItems.map((x: any) => x.id === product.id ? product : x) }
      // }
      return { cartItems: [...state.cartItems, item] };
    default:
      return state;
  }
}