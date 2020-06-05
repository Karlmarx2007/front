import { Search } from '../constants/searchConstants';

const searchProduct = (name: string) => async (dispatch: any) => {
  dispatch({
    type: Search.SEARCH_PRODUCT_REQUEST,
    payload: name
  })
}

export { searchProduct };