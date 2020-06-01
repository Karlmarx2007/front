import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Photo from "../components/photo";
import { Product } from "../models/product";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "../actions/productActions";
import Loader from "../components/loader";

export interface IProductListState {
  productList: Product[];
}

export interface ISearchState {
  searchWord: string;
}

const All = () => {
  const productList = useSelector<IProductListState, any>(
    (state) => state.productList
  );
  const search = useSelector<ISearchState, any>(
    state => state.searchWord
  );
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return loading ? (
    <div>
      <Loader size="large" />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container className="d-flex justify-content-center flex-wrap-wrap">
      <Row>
        {products.filter((p: Product)=> p.title.toLowerCase().includes(search)).map((p: Product) => (
          <Col className="mb-2" key={p._id} style={{display: 'inline-block'}}>
            <Photo {...p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default All;
