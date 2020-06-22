import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { IUserSignIn } from './signin';
import StyledButton from '../components/styled-button';
export interface ICartState {
  cart: CartItem[];
}

const StyledH2 = styled.h2`
  text-align: center;
  @media screen and (max-width: 576px){
    font-size: 1.5rem;
  }
`;


const Cart = () => {
  let totalPrice;
  const cart: {cartItems: CartItem[]} = useSelector<ICartState, any>(state => state.cart);

  if (cart.cartItems.length) {
    totalPrice = cart.cartItems.map(c => c.price).reduce((a, b) => b ? a + b : a, 0).toFixed(2);
  }

  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );

  const { userInfo } = userSignIn;

  return !cart.cartItems.length ? (
      <Container>
        <StyledH2>Your Shopping Cart</StyledH2>
        <p style={{ textAlign: 'center' }}>Your shopping cart is empty</p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '4rem' }}>
          <div style={{ maxWidth: '20rem', width: '100%' }}>
            <Link to='/all' >
              <StyledButton label="Start Shopping" ></StyledButton>
            </Link>
          </div>
        </div>
      </Container>
  ) : (
      <Container>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '90vh'}}>
          <Fragment>
            <StyledH2>Your Shopping Cart</StyledH2>
            {
              cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
            }
            <hr />
            <Row>
              <Col style={{ textAlign: 'center' }}>Total ({cart.cartItems.length} items):</Col>
              <Col style={{ textAlign: 'center' }}><span style={{ color: 'var(--color-primary)' }}><b>CDN${totalPrice}</b></span></Col>
            </Row>
            <hr />
          </Fragment>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{width: '18rem', marginBottom: '1rem'}}>
              <Link to={userInfo ? '/review-items' : '/signup?redirect=review-items'}><StyledButton label="Checkout" ></StyledButton></Link>
            </div>
            <Link to='/all'><span style={{ color: 'var(--color-primary)', borderBottom: '3px solid var(--color-primary)' }}>Continue Shopping</span></Link>
          </div>
        </div>
    </Container>
 )
}

export default Cart;