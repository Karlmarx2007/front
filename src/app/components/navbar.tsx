import React from 'react';
import { Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IUserSignIn } from '../pages/signin';
import styled from 'styled-components';
import { CartItem } from '../models/cart-item';
import { ICartState } from '../pages/cart';

const StyledLogo = styled(NavLink)`
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-primary);;
`;
const StyledLink = styled(NavLink)`
  text-transform: capitalize;
  color: var(--color-primary);
  padding-bottom: 0.4rem;
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
`;


const NavBar = () => {
  const cart: { cartItems: CartItem[] } = useSelector<ICartState, any>(state => state.cart);

  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;

  return (
    <StyledNav>
      <StyledLogo to="/">W C</StyledLogo>
      <StyledUl>
        <StyledLi>
          {
            userInfo ?
              <StyledLink activeClassName="current" to="/profile">{userInfo._doc.name}</StyledLink> :
              <StyledLink activeClassName="current" to="/signin"><FontAwesomeIcon icon="user" className="fas" size="2x" /></StyledLink>}
        </StyledLi>
        <StyledLi>
          <StyledLink activeClassName="current" to="/cart">
            <Badge count={cart.cartItems.length} style={{backgroundColor: 'green'}}>
              <FontAwesomeIcon icon="shopping-bag" className="fas" size="2x" />
            </Badge>
          </StyledLink>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  );
}

export default NavBar;