import { Search } from "../constants/searchConstants";

function searchReducer(state = '', action: any) {
  switch (action.type) {
    case Search.SEARCH_PRODUCT_REQUEST:
      return action.payload;
    default:
      return state;
  }
}

export {searchReducer}