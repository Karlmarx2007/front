export interface Product {
  _id: string;
  title: string;
  price: number;
  available: boolean;
  type: 'Sativa' | 'Indica' | 'Hybrid';
  dominant: 'Sativa' | 'Indica';
  thcPercent: { min: number, max: number };
  cbdPercent: { min: number, max: number };
  source: string;
  thcGram?: { min: number, max: number };
  cbdGram?: { min: number, max: number };
}
