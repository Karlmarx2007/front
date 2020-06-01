import { RollsList } from './../constants/productConstants';
import { ProductDetails, ProductList, IndicaList, SativaList, ProductDelete, ProductUpdate, EdibleList } from "../constants/productConstants"


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

export function productDeleteReducer(state = {}, action: any) {
  switch (action.type) {
    case ProductDelete.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    
    case ProductDelete.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    
    case ProductDelete.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.error };
    
    default:
      return state;
  }
}

export function productUpdateReducer(state = {}, action: any) {
  switch (action.type) {
    case ProductUpdate.PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case ProductUpdate.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: action.payload };

    case ProductUpdate.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
}

export function indicaListReducer(state = { products: [] }, action: any) {
  switch (action.type) {
    case IndicaList.INDICA_LIST_REQUEST:
      return { loading: true }

    case IndicaList.INDICA_LIST_SUCCESS:
      return { loading: false, products: action.payload }

    case IndicaList.INDICA_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export function sativaReducer(state = { products: [] }, action: any) {
  switch (action.type) {
    case SativaList.SATIVA_REQUEST:
      return { loading: true }

    case SativaList.SATIVA_SUCCESS:
      return { loading: false, products: action.payload }

    case SativaList.SATIVA_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export function edibleReducer(state = { products: [] }, action: any) {
  switch (action.type) {
    case EdibleList.EDIBLE_REQUEST:
      return { loading: true }

    case EdibleList.EDIBLE_SUCCESS:
      return { loading: false, products: action.payload }

    case EdibleList.EDIBLE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export function rollsReducer(state = { products: [] }, action: any) {
  switch (action.type) {
    case RollsList.ROLLS_REQUEST:
      return { loading: true }

    case RollsList.ROLLS_SUCCESS:
      return { loading: false, products: action.payload }

    case RollsList.ROLLS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}