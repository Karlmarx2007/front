import { CREATE_PRODUCT } from './../constants/createProductConstants';

export function createNewProductReducer(state = {}, action: { type: CREATE_PRODUCT, payload: any, error: any }) {
  switch (action.type) {
    case CREATE_PRODUCT.CREATE_PRODUCT_REQUEST:
      return { loading: true };
    
    case CREATE_PRODUCT.CREATE_PRODUCT_SUCCESS:
      return { loading: false, newProductInfo: action.payload };
    
    case CREATE_PRODUCT.CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.error };
    
    default:
      return state;
  }
}