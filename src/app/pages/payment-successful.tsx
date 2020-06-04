import React, { Fragment } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const PaymentSuccessful = (props: any) => {
  const state:any = props.location.state;
  console.log('state > ', state);
  const data = state && state.data ? state.data : undefined;
  return data ?
    <Container style={{textAlign: 'center'}}>
    <h1 style={{color: 'green'}}><CheckCircleIcon /> Payment Successful !</h1>
      <p>Thank you! Your payment has been processed successfully</p>
      <p>OrderId: {data.id}</p>
      <h5>Payment Details</h5>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.id}</td>
            <td>{new Date().toString()}</td>
            <td>${data.amount / 100} Cad</td>
            <td>{data.payment_method_details.type}</td>
          </tr>
        </tbody>
      </Table>
      <Link to='/'>
        <Button variant="outline-info" style={{ width: '100%', maxWidth: '20rem' }}>OK</Button>
      </Link>
  </Container> : <p>Oops... No Payment data found</p>;
}

export default PaymentSuccessful;