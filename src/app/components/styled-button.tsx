import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  border: 1px solid var(--color-primary);
  display: block;
  color: var(--color-primary);
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 1rem;
  background: #FFFF;
  &:hover {
    color: #FFFF;
    background: var(--color-primary);
  }
`;

type Props = {
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const StyledButton = (props: Props) => {
  return (
    <Button type={props.type} className="block">{props.label}</Button>
  )
}

export default StyledButton;