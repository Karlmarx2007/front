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

const products: Product[] = [
  {
    id: '1',
    title: 'Skywalker OG',
    type: 'Hybrid',
    price: 9.99, //$16.14/g
    dominant: 'Indica',
    thcPercent: { min: 20, max: 25 },
    cbdPercent: { min: 0, max: 1 },//Check
    source: 'skywalkerOG.jpg',
  },
  {
    id: '2',
    title: 'Blue Dream',
    type: 'Hybrid',
    price: 9.99,
    dominant: 'Sativa',
    thcPercent: { min: 17.50, max: 22 },
    cbdPercent: { min: 0, max: 1 },
    source: 'blue-dream.png',
  }
];

export default products;