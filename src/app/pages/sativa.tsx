import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'antd';
import { Product } from '../models/product';
import Photo from '../components/photo';
import { useSelector, useDispatch } from 'react-redux';
import { sativaListAction } from '../actions/productActions';
import Loader from '../components/loader';

interface IndicaState {
  sativaList: Product[];
}

const Sativa = () => {
  const sativaList = useSelector<IndicaState, any>(state => state.sativaList);
  const { products, loading, error } = sativaList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sativaListAction())
  }, [dispatch]);


  return loading ? <div><Loader size='large' /></div> : error ? <div>{error}</div> :
  (
    <Container className="d-flex justify-content-center">
      <Row>
        {products.map((p: Product) => (
          <Col className="mb-2" key={p.id}>
            <Photo
              id={p.id}
              title={p.title}
              source={p.source}
              price={p.price}
              type={p.type}
              dominant={p.dominant}
              thcPercent={p.thcPercent}
              cbdPercent={p.cbdPercent}
              thcGram={p.thcGram ? p.thcGram : undefined}
              cbdGram={p.cbdGram ? p.cbdGram : undefined}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Sativa;