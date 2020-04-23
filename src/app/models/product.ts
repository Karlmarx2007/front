export interface Product {
  id: string;
  title: string;
  price: number;
  type: 'Sativa' | 'Indica' | 'Hybrid';
  dominant: 'Sativa' | 'Indica',
  thcPercent: {min: number, max: number},
  cbdPercent: { min: number, max: number },
  source: string,
  thcGram?: {min: number, max: number},
  cbdGram?: {min: number, max: number},
}
