import axios from 'axios';

import { ORDER } from '../constants/order-constants';
import { environment } from '../environments/environments';
import { Order } from './../models/order';

const createOrder = (order: Order) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ORDER.CREATE_ORDER_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.post(`${environment.prodUrl}/orders/create`, { ...order }, {
      headers: {
        Authorization: 'Bearer' + userInfo.token
      }
    });
    dispatch({ type: ORDER.CREATE_ORDER_SUCCESS, data });
  } catch (error) {
    dispatch({type: ORDER.CREATE_ORDER_FAIL, error: error.message})
  }
}

const getOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ORDER.ORDER_LIST_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    const { data } = await axios.get(`${environment.prodUrl}/orders/get-orders/${userInfo._doc._id}`, {
      headers: {
        Authorization: 'Bearer' + userInfo.token
      }
    });
    dispatch({ type: ORDER.ORDER_LIST_SUCCESS, data });
  } catch (error) {
    dispatch({ type: ORDER.ORDER_LIST_FAIL, error: error.message })
  }
}
export { createOrder, getOrders };