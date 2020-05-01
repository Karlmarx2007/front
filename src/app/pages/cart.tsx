import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import styled from 'styled-components';
import Image from "react-bootstrap/Image";
import Loader from '../components/loader';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';


export interface ICartState {
  cart: CartItem[];
}
const StyledImage = styled(Image)`
  max-height: 5rem;
  max-width: 5rem;
`;


const Cart = (props: any) => {
  let totalPrice;
  const dispatch = useDispatch();
  const cart: {cartItems: CartItem[]} = useSelector<ICartState, any>(state => state.cart);
  const productId = props.match.params.id;
  const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  if (cart.cartItems.length) {
    totalPrice = cart.cartItems.map(c => c.price).reduce((a, b) => b ? a + b : a, 0).toFixed(2);
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);
  
  return !cart.cartItems.length ? (
    <div>
      <Loader size="large" />
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
        <Button variant="info">Checkout</Button>
    </Container>
 )
}

export default Cart;