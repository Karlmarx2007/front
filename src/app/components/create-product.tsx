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
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../actions/newProductActions';
import { Product } from '../models/product';

export interface ICreateNewProduct {
  available: boolean;
  dominant: 'Sativa' | 'Indica';
  price: number;
  source: string;
  title: string;
  type: 'Sativa' | 'Indica' | 'hybrid';
  minThc: number;
  maxThc: number;
  minCbd: number;
  maxCbd: number;
  description: string;
};

const initialValues = {
  available: true,
  dominant: '',
  price: '',
  source: '',
  title: '',
  type: '',
  minThc: '',
  maxThc: '',
  minCbd: '',
  maxCbd: '',
  description: '',
  minThcPerGram: '',
  maxThcPerGram: '',
  minCbdPerGram: '',
  maxCbdPerGram: '',
};

const schema = yup.object({
  available: yup.boolean().default(true).required('Required'),
  dominant: yup.string().oneOf(['Sativa', 'Indica']).required('Required'),
  price: yup.number().min(0).required('Required'),
  source: yup.string().required('Required'),
  title: yup.string().required('Required'),
  type: yup.string().oneOf(['Sativa', 'Indica', 'Hybrid']).required('Required'),
  minThc: yup.number().min(0).max(100).required('Required'),
  maxThc: yup.number().min(0).max(100).required('Required'),
  minCbd: yup.number().min(0).max(100).required('Required'),
  maxCbd: yup.number().min(0).max(100).required('Required'),
  description: yup.string().max(2000).required('Required'),
  minThcPerGram: yup.number().min(0).max(100).required('Required'),
  maxThcPerGram: yup.number().min(0).max(100).required('Required'),
  minCbdPerGram: yup.number().min(0).max(100).required('Required'),
  maxCbdPerGram: yup.number().min(0).max(100).required('Required'),
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
  const dispatch = useDispatch();
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
              const payload = {
                title: values.title,
                price: parseFloat(values.price),
                available: values.available,
                type: values.type,
                dominant: values.dominant,
                source: values.source,
                thcPercent: { min: parseFloat(values.minThc), max: parseFloat(values.maxThc) },
                thcGram: { min: parseFloat(values.minThcPerGram), max: parseFloat(values.maxThcPerGram) },
                cbdPercent: { min: parseFloat(values.minCbd), max: parseFloat(values.maxCbd) },
                cbdGram: { min: parseFloat(values.minCbdPerGram), max: parseFloat(values.maxCbdPerGram) },
                description: values.description
              }
              dispatch(createNewProduct(payload));
              setSubmitting(false);
              props.productHandler(false);
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
                      name="minThc"
                      label="Min THC %"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maxThc"
                      label="Max THC %"
                    />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <TextInput
                      name="minThcPerGram"
                      label="Min THC /g"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maxThcPerGram"
                      label="Max THC /g"
                    />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <TextInput
                      name="minCbd"
                      label="Min CBD %"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maxCbd"
                      label="Max CBD %"
                    />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <TextInput
                      name="minCbdPerGram"
                      label="Min CBD /g"
                    />
                  </Col>
                  <Col>
                    <TextInput
                      name="maxCbdPerGram"
                      label="Max CBD /g"
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