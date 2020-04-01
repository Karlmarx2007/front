import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import Photo from '../components/photo';
import { Product } from '../models/product';

const All = () => {
  const [state, setState] = useState({
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setState({products: result.data})
    };
    fetchData();
  }, []);

  return (
    <Container className="d-flex justify-content-center">
      <Row>
        {state.products.map((p: Product) => (
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