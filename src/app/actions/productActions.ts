import axios from 'axios';
import { ProductList, ProductDetails } from './../constants/productConstants';


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

export { productListAction, productDetailsAction};
