import { ProductDetails, ProductList } from "../constants/productConstants"


export function productListReducer(state= {products: []}, action: any) {
  switch (action.type) {
    case ProductList.PRODUCT_LIST_REQUEST:
      return {loading: true}

    case ProductList.PRODUCT_LIST_SUCCESS:
      return {loading: false, products: action.payload}

    case ProductList.PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload}

    default:
      return state
  }
}

export function productDetailsReducer(state = { product: {} }, action: any) {
  switch (action.type) {
    case ProductDetails.PRODUCT_DETAILS_REQUEST:
      return { loading: true }

    case ProductDetails.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }

    case ProductDetails.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}