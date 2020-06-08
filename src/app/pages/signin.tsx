import React, { useEffect, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../actions/user-actions';
import TextInput from '../components/text-input';
import StyledButton from '../components/styled-button';

export interface IUserSignIn { 
  userSignIn: any
};
const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().min(6).required('Required')
});

const initialValues = {
  email: '',
  password: ''
};

const SignIn = (props: any) => {
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { loading, userInfo, error } = userSignIn;
  const dispatch = useDispatch();
  
  const redirect =  props.location.search ? props.location.search.split('=')[1] : '/'
  useEffect(() => {    
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, redirect, props.history]);

  return (
    <Fragment>
      {error ? <Card style={{ maxWidth: '400px', margin: 'auto' }} className="mb-1">
        <Card.Body>
          <Card.Text style={{color: 'red'}}>{error}</Card.Text>
        </Card.Body>
      </Card> : undefined}
      <br/>
      <Card style={{ maxWidth: '400px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>Sign-In</Card.Title>
          {loading ? <Card.Subtitle className="mb-2 text-muted">Loading...</Card.Subtitle> : undefined}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(signIn(values));
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form noValidate onSubmit={formik.handleSubmit} >
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
                <StyledButton label="Sign-In" type='submit'/>
                <hr />
                <h6>New User?</h6>
                <Link to={redirect === '/' ? '/signup' : '/signup?redirect=' + redirect}>
                  <Button variant="outline-secondary" block>Create Account</Button>
                </Link>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default SignIn;