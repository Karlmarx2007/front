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


export interface ICartState {
  cart: CartItem[];
}


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
        <h2 style={{ textAlign: 'center' }}>Your Shopping Cart</h2>
        <p style={{ textAlign: 'center' }}>Your shopping cart is empty</p>
        <div style={{ textAlign: 'center', marginTop: '4rem'}}>
          <Link to='/' >
            <Button variant="outline-info" style={{ width: '100%', maxWidth: '20rem' }}>Start Shopping</Button>
          </Link>
        </div>
      </Container>
  ) : (
      <Container>
        <h2 style={{textAlign: 'center'}}>Your Shopping Cart</h2>
        {
          cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
        }
        <hr/>
        <Row>
          <Col>Total ({cart.cartItems.length} items):</Col>
          <Col><span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></Col>
        </Row>
        <hr />
        <div style={{textAlign: 'center', width: '100%'}}>
          <Link to={userInfo ? '/review-items' : '/signup?redirect=review-items'}><Button variant="outline-info" style={{ width: '100%', maxWidth: '20rem' }}>Checkout</Button></Link>
        </div>
    </Container>
 )
}

export default Cart;