import axios from 'axios';
import { ProductList, ProductDetails, IndicaList, SativaList } from './../constants/productConstants';


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

const indicaListAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: IndicaList.INDICA_LIST_REQUEST });
    const { data } = await axios.get('/api/products/indica');
    dispatch({ type: IndicaList.INDICA_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: IndicaList.INDICA_LIST_FAIL, payload: error.message })
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

export { productListAction, productDetailsAction, indicaListAction, sativaListAction};
