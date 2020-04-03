import React, { useEffect } from 'react';
import { Product } from '../models/product';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { productDetailsAction } from '../actions/productActions';
import Loader from '../components/loader';

export interface ProductDetailState {
  productDetails: Product;
}

const ProductDetail =  (props: any) => {
  const id = props.match.params.id;
  const productDetails =  useSelector<ProductDetailState, any>(
    state => state.productDetails
  );
  const {product, loading, error} = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetailsAction(id))
  }, [dispatch, id]);


  const imageSrc = require(`../../assets/images/${product && product.source ? product.source : 'default-weed.jpg'}`);

  if (loading) {
    return <div><Loader size='large' /></div>
  }
  if (error) {
    return <div>{error}</div>
  }
  if (Object.keys(product).length === 0) {
    return <div>Product not found hahaha</div>
  } else {
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
  }
}

export default ProductDetail;