import React, { useEffect } from "react";

import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "../actions/productActions";
import ProductRenderer from "../components/product-renderer";

export interface IProductListState {
  productList: Product[];
}

const All = () => {
  const productList = useSelector<IProductListState, any>(
    (state) => state.productList
  );
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return <ProductRenderer products={products} loading={loading} error={error} />
};

export default All;
