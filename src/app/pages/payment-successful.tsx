import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearCart } from '../actions/cart-actions';
import Cookie from 'js-cookie';
import StyledButton from '../components/styled-button';


const StyledCol = styled(Col)`
  text-align: left;
  padding-left: 5rem;

  @media only screen and (max-width: 768px) {
    padding-left: 1.5rem;
  }
`;
const StyledHeading = styled.p`
  color:var(--color-primary);
  font-size: 2rem;
  @media only screen and (max-width: 450px){
    font-size: 1.5rem;
  }
`;
const PaymentSuccessful = (props: RouteComponentProps<any>) => {
  const dispatch = useDispatch();
  const state: any = props.location.state;
  const data = state && state.data ? state.data : undefined;
  useEffect(() => {
    dispatch(clearCart());
    Cookie.remove('cartItems');
  }, [dispatch]);

  return data ?
    <Container style={{textAlign: 'center'}}>
    <StyledHeading><CheckCircleIcon /> Payment Successful !</StyledHeading>
      <p>Thank you! Your payment has been processed successfully</p>
      <h5>Payment Details</h5>
      <Card>
        <Row>
          <StyledCol md={6}>
            <p><b>Order: </b>{data.id}</p>
            <p><b>Date: </b>{new Date().toString()}</p>
          </StyledCol>
          <StyledCol md={6}>
            <p><b>Total: </b>${data.amount / 100} CAD</p>
            <p><b>Payment Method: </b>{data.payment_method_details.type}</p>
          </StyledCol>
        </Row>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
        <div style={{ maxWidth: '20rem', width: '100%' }}>
          <Link to='/'><StyledButton label="OK" ></StyledButton></Link>
        </div>
      </div>
  </Container> : <p>Oops... No Payment data found</p>;
}

export default PaymentSuccessful;