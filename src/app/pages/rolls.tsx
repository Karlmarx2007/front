import React, { useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { rollsListAction } from "../actions/product-actions";
import ProductRenderer from "../components/product-renderer";

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

  return <ProductRenderer products={products} loading={loading} error={error} />
};

export default Rolls;