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
import { updateProductAction } from '../actions/productActions';
import { IUserSignIn } from '../pages/signin';

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
  productHandler: any,
  product: Product | undefined
}

const CreateProduct: React.FC<Props> = (props) => {
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;
  const initialValues = {
    available: props.product?.available || true,
    dominant: props.product?.dominant || '',
    price: props.product?.price || '',
    source: props.product?.source || '',
    title: props.product?.title || '',
    type: props.product?.type || '',
    minThc: props.product?.thcPercent.min || '',
    maxThc: props.product?.thcPercent.max || '',
    minCbd: props.product?.cbdPercent.min || '',
    maxCbd: props.product?.cbdPercent.max || '',
    description: props.product?.description || '',
    minThcPerGram: props.product?.thcGram?.min || '',
    maxThcPerGram: props.product?.thcGram?.max || '',
    minCbdPerGram: props.product?.cbdGram?.min || '',
    maxCbdPerGram: props.product?.cbdGram?.max || '',
  };
  
  const dispatch = useDispatch();
  const [state, setState] = useState({
    checked: props.product ? props.product.available : true
  });

  const handleCheck = () => {
    setState((prevState) => ({ checked: !prevState.checked }));
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
              let payload = {
                title: values.title,
                price: values.price,
                available: values.available,
                type: values.type,
                dominant: values.dominant,
                source: values.source,
                thcPercent: { min: values.minThc, max: values.maxThc },
                thcGram: { min: values.minThcPerGram, max: values.maxThcPerGram },
                cbdPercent: { min: values.minCbd, max: values.maxCbd },
                cbdGram: { min: values.minCbdPerGram, max: values.maxCbdPerGram },
                description: values.description
              }
              if (props.product) {
                const UpdatePayload = { _id: props.product._id, ...payload };
                dispatch(updateProductAction(UpdatePayload, userInfo))
              } else {
                dispatch(createNewProduct(payload, userInfo))
              }
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
                  <Button type="submit" variant="success" block>{props.product ? 'Update' : 'Create'}</Button>
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