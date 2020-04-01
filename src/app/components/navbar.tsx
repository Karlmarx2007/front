import React from 'react';
import { Menu } from 'antd';

const NavBar = () =>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "40px" }}
    >
      <Menu.Item key="1">Cart</Menu.Item>
      <Menu.Item key="2">Sign In</Menu.Item>
    </Menu>

export default NavBar;