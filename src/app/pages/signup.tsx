import React, { Fragment, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import TextInput from '../components/text-input';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../actions/user-actions';

export interface IUserSignUp {
  userSignUp: any
};

const schema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().min(6).required('Required'),
  repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords don\'t match').required('Password Repeat is required')
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
};

const SignUp = (props: any) => {
  const userSignUp = useSelector<IUserSignUp, any>(
    state => state.userSignUp
  );
  const { loading, userInfo, error } = userSignUp;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [userInfo, redirect, props.history]);
  return (
    <Fragment>
      {error ? <Card style={{ maxWidth: '400px', margin: 'auto' }} className="mb-1">
        <Card.Body>
          <Card.Text style={{ color: 'red' }}>{error}</Card.Text>
        </Card.Body>
      </Card> : undefined}
      <br />
      <Card style={{ maxWidth: '400px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>Sign-Up</Card.Title>
          {loading ? <Card.Subtitle className="mb-2 text-muted">Loading...</Card.Subtitle> : undefined}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(signUp(values));
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form noValidate onSubmit={formik.handleSubmit} >
                <TextInput
                  label="Your Name"
                  name="name"
                />
                <TextInput
                  label="E-mail address"
                  name="email"
                  type="email"
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                />
                <TextInput
                  label="Repeat Password"
                  name="repeatPassword"
                  type="password"
                />
                <Button type="submit" variant="outline-info" size="lg" block>Create Account</Button>
                <hr />
                <h6>Already a user?</h6>
                <Link to={redirect === '/' ? '/signin' : '/signin?redirect=' + redirect}>
                  <Button variant="outline-secondary" size="lg" block>Sign-In</Button>
                </Link>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default SignUp;