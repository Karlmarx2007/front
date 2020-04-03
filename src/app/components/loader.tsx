import React from 'react';
import { Spin } from 'antd';

type Props = {
  size?: 'small' | 'large';
}

const Loader: React.FC<Props> = props => (
  <div>
    <Spin {...props} />
  </div>
);

export default Loader;