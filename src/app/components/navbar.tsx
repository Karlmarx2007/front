import React, { useState } from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IUserSignIn } from '../pages/signin';

const NavBar = () => {
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;  
  const [state, setState] = useState('user');

  const handleClick = (e: any)=> {
    setState(e.key)
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[state]}
      onClick={handleClick}
      style={{ lineHeight: "40px" }}
    >
      <Menu.Item key="user">
        {userInfo ? <Link to="/profile">{userInfo._doc.name}</Link> : <Link to="/signin"><FontAwesomeIcon icon="user" className="fas" size="2x" /></Link>}
      </Menu.Item>
      <Menu.Item key="shopping-bag">
        <Link to="/cart"><FontAwesomeIcon icon="shopping-bag" className="fas" size="2x" /></Link>
      </Menu.Item>
    </Menu>
  );
}
    

export default NavBar;