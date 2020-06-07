import React, { lazy, Suspense, useEffect } from "react";

import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "../actions/product-actions";
import Card from "react-bootstrap/Card";

const ProductRenderer = lazy(() => import('../components/product-renderer'))

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
    <Suspense fallback={<Card style={{maxWidth: '320', maxHeight: '354'}}></Card>}>
      <ProductRenderer products={products} loading={loading} error={error} />
    </Suspense>
  )
};

export default All;
