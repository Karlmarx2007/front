import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../models/product';
import Loader from './loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Photo from './photo';
import Slide from '@material-ui/core/Slide/Slide';
import Fade from '@material-ui/core/Fade/Fade';

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
      <Loader />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
        <Container className="d-flex justify-content-center flex-wrap-wrap">
          <Row>
            {products.filter((p: Product) => p.title.toLowerCase().includes(search)).map((p: Product) => (
              <Fade in={true} key={p._id}>
                <Col className="mb-2" style={{ display: 'inline-block' }}>
                  <Photo {...p} />
                </Col>
              </Fade>
              
            ))}
          </Row>
        </Container>
      );
}

export default ProductRenderer;