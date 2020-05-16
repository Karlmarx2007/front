import React from 'react';
import Form from 'react-bootstrap/Form';
import { useField, ErrorMessage } from 'formik';
import styled from 'styled-components';

type Props = {
  label?: string,
  name: string,
  [key: string]: any
};

const Span = styled.span`
  color: red;
`;

const Check: React.FC<Props> = props => {
  const [field, meta] = useField({ ...props, type: 'radio' });

  return (
    <Form.Group >
      {/* {props.label ? <Form.Label className="ml-0"><b>{props.label}</b></Form.Label> : null} */}
      <Form.Check
        custom
        {...field}
        {...props}
      />
      <Span>
        {meta.touched && meta.error ? (
          <ErrorMessage name={props.name} />
        ) : null}
      </Span>
    </Form.Group>
  )
}

export default Check;