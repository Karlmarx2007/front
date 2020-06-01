import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

type Props = {
  size?: 'small' | 'large';
}

const StyledLoader = styled.div`
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`;

const Loader: React.FC<Props> = props => (
  <StyledLoader>
    <Spin {...props} />
  </StyledLoader>
);

export default Loader;