import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import Photo from '../components/photo';
import { Product } from '../models/product';
import { useSelector, useDispatch } from 'react-redux';
import { productListAction } from '../actions/productActions';
import Loader from '../components/loader';

export interface IRootState {
  productList: Product[];
}

const All = () => {
  const productList = useSelector<IRootState, any>(
    state => state.productList
  );
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch])

  return loading ? <div><Loader size='large'/></div> : error ? <div>{error}</div> :
  (
    <Container className="d-flex justify-content-center">
      <Row>
        {products.map((p: Product) => (
          <Col className="mb-2" key={p.id}>
            <Photo
              {...p}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default All;