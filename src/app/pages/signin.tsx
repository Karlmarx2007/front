import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import TextInput from '../components/text-input';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().min(6).required('Required')
});

const initialValues = {
  email: '',
  password: ''
};

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Body>
        <Card.Title>Sign-In</Card.Title>
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
                label="E-mail address"
                name="email"
                type="email"
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
              />
              <Button type="submit" variant="info" size="lg" block>Sign-In</Button>
              <hr />
              <h6>New User?</h6>
              <Link to={'/signup'}>
                <Button variant="secondary" size="lg" block>Create Account</Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default SignIn;