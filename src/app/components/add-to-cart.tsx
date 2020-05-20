import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

type Props = {
  _id: string;
  price: number;
  available: boolean;
};

const schema = yup.object({
  quantity: yup.number().required(),
});

const initialValues = {
  quantity: 1,
};

const quantitySource = [
  { label: "1g", value: 1 },
  { label: "3.5g", value: 3 },
  { label: "7g", value: 7 },
];

const AddToCart: React.FC<Props> = ({ ...props }) => {
  const [state, setState] = useState({
    price: props.price,
    quantity: 1
  });

  return (
    <Card style={{maxWidth: '200px', margin: 'auto'}}>
      <Card.Body>
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
                    setState({price: props.price, quantity: Number(e.currentTarget.value) });
                  }}
                >
                  {quantitySource.map((s, index) => (
                    <option key={index} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Field>
              </Form.Row>
              <Link to={`/cart/${props._id}?qty=${state.quantity}`}>
                <Button type="submit" disabled={!props.available} variant="info" className="mt-2" block>
                    Add to cart
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default AddToCart;
