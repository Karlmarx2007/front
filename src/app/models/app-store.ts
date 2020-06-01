import { ShippingAddress } from './shipping-address';
import { CartItem } from "./cart-item";

export interface IAppStore {
  cart: CartItem[];
  shipping: ShippingAddress;
}