import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { calculatePrice } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { CartItem } from "../models/cart-item";

type Props = {
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
  const [state, setState] = useState({
    price: props.price,
    quantity: 1
  });

  const dispatch = useDispatch();

  return (
    <Card style={{maxWidth: '200px', margin: 'auto'}}>
      <Card.Body>
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
            dispatch(addToCart(cartItem))
          }}
        >
          {(formik) => (
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Row>
                <p>
                  Price: <b style={{ color: "#b50404" }}> ${state.price}</b>
                </p>
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
              <Button type="submit" disabled={!props.available} variant="info" className="mt-2" block>
                Add to cart
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default AddToCart;
