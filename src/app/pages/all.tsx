import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { productListAction } from "../actions/product-actions";
import ProductRenderer from "../components/product-renderer";
import { Product } from "../models/product";

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

  return (
    <ProductRenderer products={products} loading={loading} error={error} />
  )
};

export default All;
