import React from 'react';
import { useField, useFormikContext, ErrorMessage } from 'formik';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

type Props = {
  name: string,
  [key: string]: any,
};

const Span = styled.span`
  color: red;
`;
const TextArea: React.FC<Props> = props => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  useFormikContext();
  return (
    <Form.Group controlId={props.id || props.name}>
      {props.label ? <Form.Label className="ml-0"><b>{props.label}</b></Form.Label> : null}
      <Form.Control as="textarea" {...field} {...props} />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Span>
        {meta.touched && meta.error ? (
          <ErrorMessage name={props.name} />
        ) : null}
      </Span>
    </Form.Group>
  );
};

export default TextArea;