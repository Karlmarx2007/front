import { CREATE_PRODUCT } from '../constants/createProductConstants';

export function createNewProductReducer(state = {}, action: { type: CREATE_PRODUCT, payload: any, error: any }) {
  const { type, error, payload } = action;

  switch (type) {
    case CREATE_PRODUCT.CREATE_PRODUCT_REQUEST:
      return { loading: true };
    
    case CREATE_PRODUCT.CREATE_PRODUCT_SUCCESS:
      return { loading: false, newProductInfo: payload };
    
    case CREATE_PRODUCT.CREATE_PRODUCT_FAIL:
      return { loading: false, error };
    
    default:
      return state;
  }
}