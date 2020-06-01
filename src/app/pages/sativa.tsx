import React, { useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { sativaListAction } from "../actions/productActions";
import ProductRenderer from "../components/product-renderer";

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

  return <ProductRenderer products={products} loading={loading} error={error} />
};

export default Sativa;