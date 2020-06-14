import { CREATE_PRODUCT } from '../constants/createProductConstants';
import axios from 'axios';
import { environment } from '../environments/environments';

const createNewProduct = (newProductValues: any, userInfo: any) => async (dispatch: any) => {
  console.log('DISPATCH');
  
  dispatch({ type: CREATE_PRODUCT.CREATE_PRODUCT_REQUEST, payload: newProductValues });
  try {
    const { data } = await axios.post(`${environment.prodUrl}/products/product`, newProductValues, {
      headers: {
        Authorization: 'Bearer' + userInfo.token
      }
    });
    dispatch({ type: CREATE_PRODUCT.CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log('Error creating New P > ', error);
    
    dispatch({ type: CREATE_PRODUCT.CREATE_PRODUCT_FAIL, error: 'Failed to create new product' });
  }
}

export {createNewProduct}