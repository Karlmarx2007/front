import React, { useState } from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
  const [state, setState] = useState({
    current: 'user'
  });

  const handleClick = (e: any)=> {
    setState({
      current: e.key
    })
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[state.current]}
      onClick={handleClick}
      style={{ lineHeight: "40px" }}
    >
      <Menu.Item key="user"><FontAwesomeIcon icon="user" className="fas" size="2x" /></Menu.Item>
      <Menu.Item key="shopping-bag"><FontAwesomeIcon icon="shopping-bag" className="fas" size="2x" /></Menu.Item>
    </Menu>
  );
}
    

export default NavBar;