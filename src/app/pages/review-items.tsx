import React, {  } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { RouteComponentProps, Redirect, Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { paymentAction } from '../actions/cart-actions';
import Loader from '../components/loader';
import StyledButton from '../components/styled-button';
import { IUserSignIn } from './signin';

export interface ICartState {
  cart: {
    cartItems: CartItem[];
    payment: any
  };
}


const ReviewItems = (props: RouteComponentProps<any>) => {
  let totalPrice: number;
  const dispatch = useDispatch();
  const cart = useSelector<ICartState, any>(state => state.cart);
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;
  const { loading, data, error } = cart.payment || {};

  if (!cart.cartItems.length) {
    props.history.push('/')
  }

  if (cart.cartItems.length) {
    totalPrice = parseFloat(cart.cartItems.map((c: CartItem) => c.price).reduce((a: number, b: number) => b ? a + b : a, 0).toFixed(2));
  }

  const makePayment = (token: any) => {
    const products = cart.cartItems;
    const body = {
      token,
      products,
    };

    dispatch(paymentAction(body));
  };

  const renderSection = () => {
    switch (true) {
      case !!loading:
        return <Loader />;

      case !!error:
        return <p>{error}</p>;

      case !!data:
        return <Redirect
          to={{
            pathname: '/payment-successful',
            state: { data }
          }}
        />;

      default:
        return (
          <Container>
            <h2 style={{ textAlign: 'center' }}>Review Items</h2>
            <Link to='/cart'><Button variant='link' style={{color: 'var(--color-primary)'}}>{'< Back to Cart'}</Button></Link>
            {
              cart.cartItems.map((item: CartItem, index: number) => <CartData key={index + item.title} {...item} />)
            }
            <hr />
            <Row>
              <Col style={{ textAlign: 'center' }}>Shipping</Col>
              <Col style={{ textAlign: 'center' }}><span><b>CDN $0.00</b></span></Col>
            </Row>
            <Row>
              <Col style={{ textAlign: 'center' }}>HST</Col>
              <Col style={{ textAlign: 'center' }}><span><b>CDN $0.00</b></span></Col>
            </Row>
            <Row>
              <Col style={{ textAlign: 'center' }}>Total ({cart.cartItems.length} items):</Col>
              <Col style={{ textAlign: 'center' }}><span style={{ color: 'var(--color-primary)' }}><b>CDN ${totalPrice}</b></span></Col>
            </Row>
            <hr />
            <div style={{ textAlign: 'center' }}>
              <StripeCheckout
                stripeKey='pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT'
                token={makePayment}
                amount={totalPrice ? totalPrice * 100 : 0}
                name='Cannabis GO'
                currency='CAD'
                email={userInfo._doc.email}
                shippingAddress
                billingAddress
                alipay
                bitcoin
              >
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
                  <div style={{ maxWidth: '20rem', width: '100%' }}>
                    <StyledButton label="Pay" ></StyledButton>
                  </div>
                </div>
              </StripeCheckout>
            </div>
          </Container>
        )
    }
  }

  return renderSection();
}

export default ReviewItems;