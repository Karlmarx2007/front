import React from 'react';
import products from '../models/product';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';


const ProductDetail= (props: any) => {
  const id = props.match.params.id;
  const product = products.find(p => p.id === id);
  console.log('product > ', product);
  

  if (product) {
    const imageSrc = require(`../../assets/images/${product.source}`);
    return (
      <Container fluid>
        <Row>
          <Col>
            <Image src={String(imageSrc)} alt="ii" style={{ height: '10rem' }} rounded fluid />
            <h6>{product.title}</h6>
            <p><b>from ${product.price}/g</b></p>
            <p>contains more {product.dominant}</p>
            <p><b>THC</b> {product.thcPercent.min} - {product.thcPercent.max}%</p>
            <p><b>CBD</b> {product.cbdPercent.min} - {product.cbdPercent.max}%</p>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (<p>Product not found</p>)
  }
}

export default ProductDetail;