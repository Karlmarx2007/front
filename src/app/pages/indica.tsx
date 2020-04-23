import React, { useEffect } from "react";
import { Product } from "../models/product";
import { Container, Row, Col } from "react-bootstrap";
import Photo from "../components/photo";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import { indicaListAction } from "../actions/productActions";

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

  return loading ? (
    <div>
      <Loader size="large" />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container className="d-flex justify-content-center">
      <Row>
        {products.map((p: Product) => (
          <Col className="mb-2" key={p.id}>
            <Photo {...p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Indica;
