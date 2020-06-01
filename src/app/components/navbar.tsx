import React from 'react';
import { Badge, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { IUserSignIn } from '../pages/signin';
import styled from 'styled-components';
import { CartItem } from '../models/cart-item';
import { ICartState } from '../pages/cart';
import { searchProduct } from '../actions/searchActions';

const StyledLogo = styled(NavLink)`
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-primary);;
`;
const StyledLink = styled(NavLink)`
  text-transform: capitalize;
  color: var(--color-primary);
  padding-bottom: 0.4rem;
  font-size: 1.2rem;
  border-bottom: 3px solid transparent;
  transition: border-color 1s;
  &:hover {
    color: var(--color-primary);
    border-color: var(--color-medium);
  }
  &.current {
    border-color: var(--color-primary);
  }
`;
const StyledLi = styled.li`
  padding: 0.1rem 1rem
`;

const StyledUl = styled.ul`
  display: flex;
  list-style: none;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;

  @media only screen and (max-width: 600px) {
    ${StyledLogo} {
      display: none;
    }
  }
`; 


const NavBar = () => {
  const cart: { cartItems: CartItem[] } = useSelector<ICartState, any>(state => state.cart);
  const dispatch = useDispatch();
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;
  const onChange = (e: any) => dispatch(searchProduct(e.target.value));

  return (
    <StyledNav>
      <StyledLogo to="/">W C</StyledLogo>
      <StyledUl>
        <StyledLi>
          <Input placeholder="search..." allowClear onChange={onChange} />
        </StyledLi>
        <StyledLi>
          {
            userInfo ?
              <StyledLink activeClassName="current" to="/inventory">{userInfo._doc.name}</StyledLink> :
              <StyledLink activeClassName="current" to="/signin"><UserOutlined /></StyledLink>}
        </StyledLi>
        <StyledLi>
          <StyledLink activeClassName="current" to="/cart">
            <Badge count={cart.cartItems.length} style={{ backgroundColor: '#b38507' }}>
              <ShoppingOutlined style={{fontSize: '1.2rem'}}/>
            </Badge>
          </StyledLink>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  );
}

export default NavBar;