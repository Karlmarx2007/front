import React from 'react';
import products from '../models/product';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'antd';
import Photo from '../components/photo';


const Indica = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Row>
        {products.filter((p) => p.dominant === 'Indica').map(p => (
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

export default Indica;