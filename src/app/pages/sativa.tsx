import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../models/product";
import Photo from "../components/photo";
import { useSelector, useDispatch } from "react-redux";
import { sativaListAction } from "../actions/productActions";
import Loader from "../components/loader";
import ProductRenderer from "../components/product-renderer";

interface IndicaState {
  sativaList: Product[];
}

const Sativa = () => {
  const sativaList = useSelector<IndicaState, any>((state) => state.sativaList);
  const { products, loading, error } = sativaList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sativaListAction());
  }, [dispatch]);

  return <ProductRenderer products={products} loading={loading} error={error} />
};

export default Sativa;