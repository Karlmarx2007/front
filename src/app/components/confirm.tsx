import React from 'react';
import Popconfirm from 'antd/lib/popconfirm';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Confirm = (props: any) => {

  const confirm = () => props.confirm();
  return (
    <Popconfirm
      title="Are you sure？"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={confirm}
      okText="Yes"
    >
      <FontAwesomeIcon icon={props.icon} className="fas" />
    </Popconfirm>
  )
}

export default Confirm;