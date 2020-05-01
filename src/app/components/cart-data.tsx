import React, { Fragment } from 'react';
import styled from 'styled-components';
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CartItem } from '../models/cart-item';
import Button from 'react-bootstrap/Button';


const StyledImage = styled(Image)`
  max-height: 5rem;
  max-width: 5rem;
`;

const CartData = (props: CartItem) => {  
  const imageSrc = require(`../../assets/images/${props.source}`);

  const removeItemHandler = (id: string) => {
    console.log('Delete called');
    
  }
  return (
    <Fragment>
      <hr/>
      <Row>
        <Col>
          <StyledImage src={String(imageSrc)} alt="ii" rounded fluid />
          <Button variant="link" onClick-={() => removeItemHandler(props.id)}>Remove</Button>
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