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
  const dispatch = useDispatch();
  const imageSrc = require(`../../assets/images/${props.source}`);

  const removeItemHandler = (id: string) => {
    dispatch(removeFromCart(id));
  }
  return (
    <Fragment>
      <hr/>
      <Row>
        <Col>
          <StyledImage src={String(imageSrc)} alt="ii" rounded fluid />
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