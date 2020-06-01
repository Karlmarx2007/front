import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../models/product';
import Loader from './loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Photo from './photo';

export interface ISearchState {
  searchWord: string;
};

type Props = {
  products: Product[],
  loading: boolean,
  error: any
}

const ProductRenderer: React.FC<Props> = ({products, loading, error}) => {
  const search = useSelector<ISearchState, any>(
    state => state.searchWord
  );

  return loading ? (
    <div>
      <Loader size="large" />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
        <Container className="d-flex justify-content-center flex-wrap-wrap">
          <Row>
            {products.filter((p: Product) => p.title.toLowerCase().includes(search)).map((p: Product) => (
              <Col className="mb-2" key={p._id} style={{ display: 'inline-block' }}>
                <Photo {...p} />
              </Col>
            ))}
          </Row>
        </Container>
      );
}

export default ProductRenderer;