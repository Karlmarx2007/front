import React, { Fragment, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import TextInput from './text-input';
import SelectInput from './select-input';
import TextArea from './text-area';


const initialValues = {
  available: true,
  dominant: '',
  price: '',
  source: '',
  title: '',
  type: '',
  minimumThc: '',
  maximumThc: '',
  minimumCbd: '',
  maximumCbd: '',
  description: ''
};

const schema = yup.object({
  available: yup.boolean().default(true).required('Required'),
  dominant: yup.string().oneOf(['Sativa', 'Indica']).required('Required'),
  price: yup.number().min(0).required('Required'),
  source: yup.string().required('Required'),
  title: yup.string().required('Required'),
  type: yup.string().oneOf(['Sativa', 'Indica', 'Hybrid']).required('Required'),
  minimumThc: yup.number().min(0).max(100).required('Required'),
  maximumThc: yup.number().min(0).max(100).required('Required'),
  minimumCbd: yup.number().min(0).max(100).required('Required'),
  maximumCbd: yup.number().min(0).max(100).required('Required'),
  description: yup.string().max(2000).required('Required')
});

const typeSource = [
  { key: 'Sativa', value: 'Sativa' },
  { key: 'Indica', value: 'Indica' },
  { key: 'Hybrid', value: 'Hybrid' }
];

const dominantSource = [
  { key: 'Sativa', value: 'Sativa' },
  { key: 'Indica', value: 'Indica' },
];

type Props = {
  productHandler: any
}

const CreateProduct: React.FC<Props> = (props) => {
  const [state, setState] = useState({
    checked: true
  });

  const handleCheck = () => {
    setState({...state, checked: !state.checked})
  }
  
  return (
    <Fragment>
      <Card className="mb-2" style={{ maxWidth: '600px', margin: 'auto'}}>
        <Card.Body>
          <Card.Title>Create Product</Card.Title>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('values >> ', values);
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Row>
                  <Col>
                    <TextInput
                      label="Name"
                      name="title"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      label="Price/g"
                      name="price"
                    />
                  </Col>
                </Form.Row>
                <TextInput name="source" label="Product Url" />
                <TextArea name="description" label="Description" rows={3} />
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Available"
                  name="available"
                  feedback={formik.errors.available}
                  checked={state.checked}
                  onClick={handleCheck}
                  {...formik.getFieldProps("available")}
                />
                <Form.Row>
                  <Col><SelectInput label="Type" name="type" source={typeSource} /></Col>
                  <Col><SelectInput label="Dominant" name="dominant" source={dominantSource} /></Col>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <TextInput
                      name="minimumThc"
                      label="Minimum THC %"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maximumThc"
                      label="Maximum THC %"
                    />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <TextInput
                      name="minimumCbd"
                      label="Minimum CBD %"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maximumCbd"
                      label="Maximum CBD %"
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mt-4 mb-4">
                  <Button type="submit" variant="success" block>Submit</Button>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Button variant="secondary" onClick={formik.handleReset} block>Reset Form</Button>
                  </Col>
                  <Col>
                    <Button variant="secondary" onClick={() => props.productHandler(false)} block>Cancel</Button>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default CreateProduct;