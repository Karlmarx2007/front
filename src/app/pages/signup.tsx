import React from 'react';
import Card from 'react-bootstrap/Card';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import TextInput from '../components/text-input';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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

const SignUp = () => {
  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Body>
        <Card.Title>Sign-Up</Card.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
              <Button type="submit" variant="info" size="lg" block>Create Account</Button>
              <hr />
              <h6>Already a user?</h6>
              <Link to={'/signin'}>
                <Button variant="secondary" size="lg" block>Sign-In</Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default SignUp;