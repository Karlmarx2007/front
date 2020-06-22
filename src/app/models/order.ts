import { ShippingAddress } from './shipping-address';
import { CartItem } from "./cart-item";

export interface Order {
  customerId: string;
  customer: string;
  cartItems: CartItem[];
  date: Date;
  status: string;
  shippingAddress?: ShippingAddress
}