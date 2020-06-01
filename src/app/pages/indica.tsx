import React, { useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { indicaListAction } from "../actions/productActions";
import ProductRenderer from "../components/product-renderer";

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

  return <ProductRenderer products={products} loading={loading} error={error} />
};

export default Indica;
