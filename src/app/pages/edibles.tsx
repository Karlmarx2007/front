import React, { lazy, Suspense, useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { ediblesListAction } from "../actions/product-actions";

const ProductRenderer = lazy(() => import('../components/product-renderer'))

interface IEdibles {
  edibleList: Product[];
}

const Edibles = () => {
  const edibleList = useSelector<IEdibles, any>((state) => state.edibleList);
  const { products, loading, error } = edibleList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ediblesListAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>Still Loading…</h1>}>
      <ProductRenderer products={products} loading={loading} error={error} />
    </Suspense>
  )
};

export default Edibles;