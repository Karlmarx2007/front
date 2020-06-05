import React, { Fragment } from 'react';
import styled from 'styled-components';
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CartItem } from '../models/cart-item';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cart-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@material-ui/core/Divider/Divider';


const StyledImage = styled(Image)`
  max-height: 5rem;
  max-width: 5rem;
`;

const CartData = (props: CartItem) => { 
  
  const dispatch = useDispatch();
  const imageSrc = props.source;
  const errorImage = require(`../../assets/images/${"default-weed.jpg"}`);

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = String(errorImage);
  }

  const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const removeItemHandler = (id: string) => {
    dispatch(removeFromCart(id));
  }
  return (
    <Fragment>
      <Divider className="mt-2 mb-2"/>
      <Row>
        <StyledCol>
          <StyledImage src={String(imageSrc)} onError={(e) => handleImageError(e)} alt="ii" rounded fluid />
          <FontAwesomeIcon icon="trash" className="fas mt-1" onClick={() => removeItemHandler(props.id)} style={{cursor: 'pointer'}}/>
        </StyledCol>
        <StyledCol>
          <p className="mt-3"><b>{props.title}</b></p>
          <p>{props.quantity}g</p>
          <p>${props.price.toFixed(2)}</p>
        </StyledCol>
      </Row>
    </Fragment>
  )
}
export default CartData;