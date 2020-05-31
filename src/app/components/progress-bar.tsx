import React from 'react';
import Progress from 'antd/lib/progress/progress';

type Props = {
  percent: number;
}
const ProgressBar: React.FC<Props> = (props) => <Progress percent={props.percent} />

export default ProgressBar;