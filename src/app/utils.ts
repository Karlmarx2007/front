export const calculatePrice = (unitPrice: number, quantity: number): number => {
  switch (quantity) {
    case 1:
      return parseFloat(unitPrice.toFixed(2));
    case 3.5:
      return parseFloat((unitPrice * 3).toFixed(2));
    case 7:
      return parseFloat((unitPrice * 5).toFixed(2));
    default:
      return 0;
  }
}