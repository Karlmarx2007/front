import React, {  } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../models/cart-item';
import CartData from '../components/cart-data';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { paymentAction } from '../actions/cart-actions';
import Loader from '../components/loader';

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
            {
              cart.cartItems.map((item: CartItem, index: number) => <CartData key={index + item.title} {...item} />)
            }
            <hr />
            <Row>
              <Col style={{ textAlign: 'center' }}>Total ({cart.cartItems.length} items):</Col>
              <Col style={{ textAlign: 'center' }}><span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></Col>
            </Row>
            <hr />
            <div style={{ textAlign: 'center' }}>
              <StripeCheckout
                stripeKey='pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT'
                token={makePayment}
                amount={totalPrice ? totalPrice * 100 : 0}
                name='Flower Buddy'
                currency='CAD'
                email='matukekarl2007@yahoo.com'
                shippingAddress
                billingAddress
                alipay
                bitcoin
              >
                <Button variant="outline-info" style={{ maxWidth: '20rem', width: '100%' }}>Pay</Button>
              </StripeCheckout>
            </div>
          </Container>
        )
    }
  }

  return renderSection();


  // return loading ? <Loader /> :
  //   error ? <p>{error}</p> :
  //     data ? <Redirect
  //       to={{
  //         pathname: '/payment-successful',
  //         state: { data }
  //       }}
  //     /> :
  //     (
  //     <Container>
  //       <h2 style={{ textAlign: 'center' }}>Review Items</h2>
  //       {
  //         cart.cartItems.map((item, index) => <CartData key={index + item.title} {...item} />)
  //       }
  //       <hr />
  //       <Row>
  //         <Col style={{ textAlign: 'center' }}>Total ({cart.cartItems.length} items):</Col>
  //         <Col style={{ textAlign: 'center' }}><span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></Col>
  //       </Row>
  //       <hr />
  //       <div style={{ textAlign: 'center' }}>
  //         <StripeCheckout
  //           stripeKey='pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT'
  //           token={makePayment}
  //           amount={totalPrice ? parseFloat(totalPrice) * 100 : 0}
  //           name='Flower Buddy'
  //           currency='CAD'
  //           email='matukekarl2007@yahoo.com'
  //           shippingAddress
  //           billingAddress
  //           alipay
  //           bitcoin
  //         >
  //           <Button variant="outline-info" style={{ maxWidth: '20rem', width: '100%' }}>Pay</Button>
  //         </StripeCheckout>
  //       </div>
  //     </Container>
  //   )
}

export default ReviewItems;