import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';

import { addToCart } from "../actions/cart-actions";
import { CartItem } from "../models/cart-item";
import { calculatePrice } from "../utils";
import { message } from "antd";
import StyledButton from "./styled-button";
import styled from "styled-components";


interface Props extends RouteComponentProps<any> {
  id: string;
  price: number;
  source: string;
  available: boolean;
  title: string;
};

const schema = yup.object({
  quantity: yup.number().required(),
});

const initialValues = {
  quantity: 1,
};

const quantitySource = [
  { label: "1g", value: 1 },
  { label: "3.5g", value: 3.5 },
  { label: "7g", value: 7 },
];

const AddToCart: React.FC<Props> = ({ ...props }) => {
  console.log('props > ', props);
  
  const [state, setState] = useState({
    price: props.price,
    quantity: 1
  });

  const dispatch = useDispatch();
  message.config({
    top: 100,
  });
  const success = () => message.success('Item added to cart');

  const StyledH1 = styled.h1`
    color: var(--color-primary);
    @media screen and (max-width: 576px){
      font-size: 1.7rem;
    }
  `;

  return (
    <div style={{width: '100%', height: '100%', margin: 'auto'}}>
      <StyledH1>{props.title}</StyledH1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          const cartItem: CartItem = {
            id: props.id,
            price: state.price,
            quantity: state.quantity,
            source: props.source,
            title: props.title,
          }
          dispatch(addToCart(cartItem));
          props.history.goBack();
          success();
        }}
      >
        {(formik) => (
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Row style={{ display: 'flex', flexDirection: 'column'}}>
              <p>
                <b style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}> ${state.price}</b>
              </p>
              <p>Shipping and HST calculated at checkout.</p>
            </Form.Row>
            <Form.Row>
              <p>
                Status:{" "}
                <b>{props.available ? "Available" : "Out of stock"}</b>
              </p>
            </Form.Row>
            <Form.Row>
              <Form.Label className="mr-2">Quantity:</Form.Label>
              <Field
                as="select"
                name="quantity"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  formik.handleChange(e);
                  const amount = Number(e.currentTarget.value);
                  const realPrice = calculatePrice(props.price, amount);
                  setState({price: realPrice, quantity: amount });
                }}
              >
                {quantitySource.map((s, index) => (
                  <option key={index} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Field>
            </Form.Row>
            <div className="mt-2"><StyledButton type="submit" label="Add to cart" disabled={!props.available} /></div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddToCart;
