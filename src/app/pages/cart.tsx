import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { Link } from 'react-router-dom';
import { IUserSignIn } from './signin';
import StyledButton from '../components/styled-button';
import styled from 'styled-components';


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
        <StyledH2>Your Shopping Cart</StyledH2>
        {
          cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
        }
        <hr/>
        <Row>
          <Col style={{textAlign: 'center'}}>Total ({cart.cartItems.length} items):</Col>
          <Col style={{ textAlign: 'center' }}><span style={{ color: 'var(--color-primary)' }}><b>CDN${totalPrice}</b></span></Col>
        </Row>
        <hr />
        <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
          <Col style={{ maxWidth: '20rem', width: '100%' }}>
            <Link to={userInfo ? '/review-items' : '/signup?redirect=review-items'}><StyledButton label="Checkout" ></StyledButton></Link>
          </Col>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
          <Col style={{ maxWidth: '20rem', width: '100%' }}>
            <Link to='/all'><Button variant='outline-secondary' block>Continue Shopping</Button></Link>
          </Col>
        </Row>
        {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem'}}>
          <div style={{ maxWidth: '20rem', width: '100%'}}>
            <Link to={userInfo ? '/review-items' : '/signup?redirect=review-items'}><StyledButton label="Checkout" ></StyledButton></Link>
          </div>
          <div style={{ maxWidth: '20rem', width: '100%' }}>
            <Link to='/'><Button variant='outline-info'>Continue Shopping</Button></Link>
          </div>
        </div> */}
    </Container>
 )
}

export default Cart;