import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { CartItem } from '../models/cart-item';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';


const StyledImage = styled(Image)`
  max-height: 5rem;
  max-width: 5rem;
`;

const CartData = (props: CartItem) => { 
  console.log('props >> ', props);
  
  const dispatch = useDispatch();
  const imageSrc = props.source;
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }

  const removeItemHandler = (id: string) => {
    dispatch(removeFromCart(id));
  }
  return (
    <Fragment>
      <hr/>
      <Row>
        <Col>
          <StyledImage src={String(imageSrc)} onError={(e) => handleImageError(e)} alt="ii" rounded fluid />
          <Button variant="link" onClick={() =>removeItemHandler(props.id)}>Remove</Button>
        </Col>
        <Col>
          <p><b>{props.title}</b></p>
          <p>{props.quantity}g</p>
          <p>${props.price.toFixed(2)}</p>
        </Col>
      </Row>
    </Fragment>
  )
}
export default CartData;