import React, { useEffect } from "react";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { ediblesListAction } from "../actions/product-actions";
import ProductRenderer from "../components/product-renderer";

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
    <ProductRenderer products={products} loading={loading} error={error} />
  )
};

export default Edibles;