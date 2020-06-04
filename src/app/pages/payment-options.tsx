import React, { Fragment, useState, useEffect } from 'react';
import ProgressBar from '../components/progress-bar';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import { Button } from 'react-bootstrap';

interface Keys {
  publishableKey: string;
  client_secret: string;
}
// const stripePromise = loadStripe('pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT');

const PaymentOptions = () => {
  // const [keys, setKeys] = useState<Keys | any>({});
  // useEffect(() => {
  //   const getKey = async () => {
  //     const {data} = await axios.get('api/payments/secret');
  //     console.log('data > ', data);
  //     setKeys(data);
  //   };
  //   getKey();
  // }, []);
  const makePayment = (token: any) => {
    const products = Array(10).fill(0).map((a: any, index) => ({name: `product${index}`, price: index * 100}))
    console.log('token > ', token);
    const body = {
      token,
      products,
    };
    
    axios.post('/api/payments/payment', body)
      .then(res => {
        console.log('@@@@@');
        
        console.log('res >> ', res)
      })
      .catch(err => {
        console.log('*****');
        console.log('err > ', err)
      })
  };

  return (
    <Fragment>
      <div className="mb-4"><ProgressBar percent={50} /></div>
      <div style={{textAlign: 'center'}}>
        <StripeCheckout
          stripeKey='pk_test_xi2naF0xng3Zoih9N2YfmoQM00lOtR1bPT'
          token={makePayment}
          name='Maxio'
          shippingAddress
          billingAddress
        >
          <Button variant="outline-info" style={{ maxWidth: '20rem', width: '100%' }}>Pay</Button>
        </StripeCheckout>
      </div>
    </Fragment>
  )
}

export default PaymentOptions;