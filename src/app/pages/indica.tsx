import React, { lazy, Suspense, useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { indicaListAction } from "../actions/product-actions";

const ProductRenderer = lazy(() => import('../components/product-renderer'))

interface IndicaState {
  indicaList: Product[];
}

const Indica = () => {
  const indicaList = useSelector<IndicaState, any>((state) => state.indicaList);
  const { products, loading, error } = indicaList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(indicaListAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>Still Loading…</h1>}>
      <ProductRenderer products={products} loading={loading} error={error} />
    </Suspense>
  )
};

export default Indica;
