import React, { Fragment, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TextInput from '../components/text-input';
import SelectInput from '../components/select-input';
import { useDispatch, useSelector } from 'react-redux';
import { createShippingAddress } from '../actions/cartActions';
import { ShippingAddress } from '../models/shipping-address';
import ProgressBar from '../components/progress-bar';
import { IAppStore } from '../models/app-store';
import { RouteComponentProps } from 'react-router-dom';

export interface ICart {
  cart: any;
}
const provinces = [
  { key: 'Alberta', value: 'AB' },
  { key: 'British Columbia', value: 'BC' },
  { key: 'Manitoba', value: 'MB' },
  { key: 'New Brunswick', value: 'NB' },
  { key: 'Newfoundland and Labrador', value: 'NL' },
  { key: 'Northwest Territories', value: 'NT' },
  { key: 'Nova Scotia', value: 'NS' },
  { key: 'Nunavut', value: 'NU' },
  { key: 'Ontario', value: 'ON' },
  { key: 'Prince Edward Island', value: 'PE' },
  { key: 'Quebec', value: 'QC' },
  { key: 'Saskatchewan', value: 'SK' },
  { key: 'Yukon', value: 'YT' },
]

const schema = yup.object({
  addressLine1: yup.string().required('Required'),
  addressLine2: yup.string(),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
  postalCode: yup.string().required('Required'),
  telephone: yup.number().required('Required')
});

const initialValues = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  telephone: ''
};

const Shipping = (props: RouteComponentProps<any>) => {
  const dispatch = useDispatch();
  const cart = useSelector<ICart, any>(state => state.cart);
  console.log('cart > ', cart);
  useEffect(() => {
    if (cart.shippingAddress) {
      props.history.push('/payment-options');
    }
  }, [cart, props.history]);
  return (
    <Fragment>
      <ProgressBar percent={0} />
      <Card style={{ maxWidth: '400px', margin: '1rem auto' }}>
        <Card.Body>
          <Card.Title>Shipping Address</Card.Title>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              console.log(JSON.stringify(values, null, 2));
              const shipping: ShippingAddress = {
                ...values,
                telephone: parseInt(values.telephone)
              }
              dispatch(createShippingAddress(shipping))
            }}
          >
            {(formik) => (
              <Form noValidate onSubmit={formik.handleSubmit} >
                <TextInput
                  label="Address Line 1"
                  name="addressLine1"
                />
                <TextInput
                  label="Address Line 2"
                  name="addressLine2"
                />
                <TextInput
                  label="City"
                  name="city"
                />
                <SelectInput
                  label="State/Province"
                  name="state"
                  source={provinces} />
                <TextInput
                  label="Postal Code/Zip"
                  name="postalCode"
                />
                <TextInput
                  label="Telephone"
                  name="telephone"
                />
                <Button type="submit" variant="success" block>Continue</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default Shipping;