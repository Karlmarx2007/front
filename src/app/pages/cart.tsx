import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { Link } from 'react-router-dom';


export interface ICartState {
  cart: CartItem[];
}


const Cart = () => {  
  let totalPrice;
  const cart: {cartItems: CartItem[]} = useSelector<ICartState, any>(state => state.cart);

  if (cart.cartItems.length) {
    totalPrice = cart.cartItems.map(c => c.price).reduce((a, b) => b ? a + b : a, 0).toFixed(2);
  }
  
  return !cart.cartItems.length ? (
    <div>
      <Container>
        <h2>Your Shopping Cart</h2>
        <p>Your shopping cart is empty</p>
      </Container>
    </div>
  ) : (
      <Container>
        <h2>Your Shopping Cart</h2>
        {
          cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
        }
        <hr/>
        <Row>
          <Col>Total ({cart.cartItems.length} items):</Col>
          <Col><span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></Col>
        </Row>
        <hr />
        <Link to="/checkout"><Button variant="info">Checkout</Button></Link>
    </Container>
 )
}

export default Cart;