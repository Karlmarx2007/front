import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
  size?: 'small' | 'large';
}

const StyledLoader = styled.div`
  text-align: center;
  padding: 170px 0;
  width: 100%;
  height: 100%;
`;

const Loader: React.FC<Props> = () => (
  <StyledLoader>
    <Spinner animation="grow" variant="dark" style={{ width: '6rem', height: '6rem'}}></Spinner>
  </StyledLoader>
);

export default Loader;