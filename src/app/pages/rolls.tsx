import React, { lazy, Suspense, useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { rollsListAction } from "../actions/product-actions";

const ProductRenderer = lazy(() => import('../components/product-renderer'))
interface IRolls {
  rollsList: Product[];
}

const Rolls = () => {
  const rollsList = useSelector<IRolls, any>((state) => state.rollsList);
  const { products, loading, error } = rollsList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rollsListAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>Still Loading…</h1>}>
      <ProductRenderer products={products} loading={loading} error={error} />
    </Suspense>
  )};

export default Rolls;