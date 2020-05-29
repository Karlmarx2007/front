export const calculatePrice = (unitPrice: number, quantity: number): number => {
  switch (quantity) {
    case 1:
      return unitPrice;
    case 3.5:
      return unitPrice * 3;
    case 7:
      return unitPrice * 5;
    default:
      return 0;
  }
}