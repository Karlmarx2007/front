
import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import styled from 'styled-components';

type Props = {
  name: string,
  source: {key: string, value: string}[],
  [key: string]: any,
};
const Span = styled.span`
  color: red;
`;
const SelectInput: React.FC<Props> = ({ source, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  useFormikContext();
  return (
    <Form.Group controlId={props.id || props.name}>
      {props.label ? <Form.Label><b>{props.label}</b></Form.Label> : null}
      <Form.Control as="select" {...field} {...props} custom="true">
        <option>---</option>
        {source.map((s, index) => 
          <option value={s.value} key={index + s.key}>{s.key}</option>
        )}
      </Form.Control>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Span>
        {meta.touched && meta.error ? (
          <ErrorMessage name={props.name} />
        ) : null}
      </Span>
    </Form.Group>
  );
}

export default SelectInput;