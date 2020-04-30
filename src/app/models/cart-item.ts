import { Price } from "./price";

export interface CartItem {
  id: string;
  price: number;
  quantity: number;
  source: string;
  title: string;
}