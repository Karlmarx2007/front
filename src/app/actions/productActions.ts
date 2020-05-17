import axios from 'axios';
import { ProductList, ProductDetails, IndicaList, SativaList, ProductDelete, ProductUpdate } from './../constants/productConstants';


const productListAction = () => async (dispatch:any) => {  
  try {
    dispatch({ type: ProductList.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: ProductList.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({type: ProductList.PRODUCT_LIST_FAIL, payload: error.message})
  }
}

const productDetailsAction = (productId: any) => async (dispatch:any) => {
  try {
    dispatch({type: ProductDetails.PRODUCT_DETAILS_REQUEST, payload: productId});
    const {data} = await axios.get('/api/products/' + productId);
    dispatch({type: ProductDetails.PRODUCT_DETAILS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: ProductDetails.PRODUCT_DETAILS_FAIL, payload: error.message })
  }
}

const productDeleteAction = (productId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: ProductDelete.PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId);
    dispatch({ type: ProductDelete.PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ProductDelete.PRODUCT_DELETE_FAIL, error: 'Failed to delete Product' });
  }
}

const updateProductAction = (product: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ProductUpdate.PRODUCT_UPDATE_REQUEST, payload: product });
    const { data } = await axios.patch('/api/products/update', product);
    dispatch({ type: ProductUpdate.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ProductUpdate.PRODUCT_UPDATE_FAIL, error: 'Failed to update Product' });
  }
}

const indicaListAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: IndicaList.INDICA_LIST_REQUEST });
    const { data } = await axios.get('/api/products/indica');
    dispatch({ type: IndicaList.INDICA_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: IndicaList.INDICA_LIST_FAIL, error: error.message })
  }
}

const sativaListAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: SativaList.SATIVA_REQUEST });
    const { data } = await axios.get('/api/products/sativa');
    dispatch({ type: SativaList.SATIVA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: SativaList.SATIVA_FAIL, payload: error.message })
  }
}

export { updateProductAction, productListAction, productDetailsAction, productDeleteAction, indicaListAction, sativaListAction};
