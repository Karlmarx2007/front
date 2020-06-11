import React, { lazy, Suspense, useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { sativaListAction } from "../actions/product-actions";

const ProductRenderer = lazy(() => import('../components/product-renderer'))

interface ISativa {
  sativaList: Product[];
}

const Sativa = () => {
  const sativaList = useSelector<ISativa, any>((state) => state.sativaList);
  const { products, loading, error } = sativaList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sativaListAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>Still Loading…</h1>}>
      <ProductRenderer products={products} loading={loading} error={error} />
    </Suspense>
  )
};

export default Sativa;