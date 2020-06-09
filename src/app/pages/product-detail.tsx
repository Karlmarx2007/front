import React, { useEffect } from "react";
import { Product } from "../models/product";
import Image from "react-bootstrap/Image";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productDetailsAction } from "../actions/product-actions";
import Loader from "../components/loader";
import AddToCart from "../components/add-to-cart";
import { RouteComponentProps } from "react-router";

export interface ProductDetailState {
  productDetails: Product;
}

const ProductDetail = (props: RouteComponentProps<any>) => {
  const id = props.match.params.id;
  const productDetails = useSelector<ProductDetailState, any>(
    (state) => state.productDetails
  );
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetailsAction(id));
  }, [dispatch, id]);

  const imageSrc = product && product.source ? product.source : '';
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);
  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }

  if (loading) {
    return (
      <div>
        <Loader  />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (Object.keys(product).length === 0) {
    return <div>Product not found hahaha</div>;
  } else {
    return (
      <Container fluid style={{marginLeft: 'auto'}}>
        <Row>
          <Col xs={12} sm={6} style={{ textAlign: 'center', height: "100%", width: '100%'}}>
            <Image
              src={String(imageSrc)}
              alt="ii"
              style={{ maxWidth: '80%', maxHeight: '80%', marginTop: '-2rem' }}
              rounded
              fluid
              onError={(e) => handleImageError(e)}
            />
            {/* <h6>{product.title}</h6>
            <p>
              <b>from ${product.price}/g</b>
            </p>
            <p>contains more {product.dominant}</p>
            <p>
              <b>THC</b> {product.thcPercent.min} - {product.thcPercent.max}%
            </p>
            <p>
              <b>CBD</b> {product.cbdPercent.min} - {product.cbdPercent.max}%
            </p> */}
          </Col>
          <Col xs={12} sm={6}>
            <AddToCart
              id={product._id}
              price={product.price}
              source={product.source}
              available={product.available}
              title={product.title}
              {...props}
            />
          </Col>
        </Row>
        <Row>
          <h2 style={{color: 'var(--color-primary)', marginTop: '2rem'}}>About this product</h2>
          <span>{product.description}</span>
        </Row>
      </Container>
    );
  }
};

export default ProductDetail;
