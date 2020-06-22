import { ORDER } from './../constants/order-constants';


const orderReducer = (state = {orders: []}, action: any) => {
  const { type, data, error } = action;

  switch (type) {
    // case ORDER.CREATE_ORDER_REQUEST:
    //   return { loading: true };
    
    case ORDER.CREATE_ORDER_SUCCESS:
      return { data };
    
    case ORDER.CREATE_ORDER_FAIL:
      return { error };
    
    case ORDER.ORDER_LIST_REQUEST:
      return { loading: true };

    case ORDER.ORDER_LIST_SUCCESS:
      return { orders: data };

    case ORDER.ORDER_LIST_FAIL:
      return { error };
  
    default:
      return state;
  }
}

export {orderReducer}