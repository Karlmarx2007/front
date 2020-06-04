import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IUserSignIn } from './signin';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Cookie from 'js-cookie';
import { clearCart } from '../actions/cartActions';

export interface ICartState {
  cart: CartItem[];
}


const ReviewItems = (props: RouteComponentProps<any>) => {
  let totalPrice;
  const dispatch = useDispatch();
  const cart: { cartItems: CartItem[] } = useSelector<ICartState, any>(state => state.cart);
  
  if (!cart.cartItems.length) {
    props.history.push('/')
  }

  if (cart.cartItems.length) {
    totalPrice = cart.cartItems.map(c => c.price).reduce((a, b) => b ? a + b : a, 0).toFixed(2);
  }

  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );

  const { userInfo } = userSignIn;

  const makePayment = (token: any) => {
    const products = cart.cartItems;
    console.log('token > ', token);
    const body = {
      token,
      products,
    };

    axios.post('/api/payments/payment', body)
      .then(({data}) => {
        props.history.push('/payment-successful', {data});
        dispatch(clearCart());
        Cookie.remove('cartItems');
      })
      .catch(err => {
        console.log('err > ', err)
      })
  };


  return (
      <Container>
        <h2 style={{ textAlign: 'center' }}>Review Items</h2>
        {
          cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
        }
        <hr />
        <Row>
          <Col>Total ({cart.cartItems.length} items):</Col>
          <Col><span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></Col>
        </Row>
        <hr />
        <div style={{ textAlign: 'center' }}>
          <StripeCheckout
            stripeKey='pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT'
            token={makePayment}
            amount={totalPrice ? parseFloat(totalPrice) * 100 : 0}
            name='Maxio'
            shippingAddress
            billingAddress
          >
            <Button variant="outline-info" style={{ maxWidth: '20rem', width: '100%' }}>Pay</Button>
          </StripeCheckout>
        </div>
      </Container>
    )
}

export default ReviewItems;