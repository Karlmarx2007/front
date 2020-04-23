import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { Price } from "../models/price";

type Props = {
  price: any;
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
  { label: "3.5g", value: 3.5 },
  { label: "7g", value: 7 },
];

const AddToCart: React.FC<Props> = ({ ...props }) => {
  console.log("props > ", props);
  const [price, setPrice] = useState(props.price["1"]);

  return (
    <Card>
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
                  Price: <b style={{ color: "#b50404" }}> ${price}</b>
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
                    setPrice(props.price[e.currentTarget.value]);
                  }}
                >
                  {quantitySource.map((s, index) => (
                    <option key={index} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Field>
              </Form.Row>
              <Button type="submit" variant="primary" className="mt-2">
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
