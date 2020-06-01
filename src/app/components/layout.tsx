import React from 'react';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import NavBar from './navbar';
import { NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../routes/routes';
import styled from 'styled-components';

const { Header, Content, Sider } = Layout;
const StyledSider = styled(Sider)`
  background: #fff;
  width: 200px;
  transition: 300ms ease;
`;

const StyledHeader = styled(Header)`
  background-color: white;
  border-bottom: 3px solid transparent;
  border-color: #efeaea;
  width: 100%;
`;

const StyledIcon = styled(FontAwesomeIcon)`
`;

const StyledSpan = styled.span`
`;

const StyledNavLink = styled(NavLink)`
  &:hover {
    ${StyledIcon}  {
      color: var(--color-primary);
    }
    ${StyledSpan}  {
      color: var(--color-primary);
    }
  }

  &.active {
    color: var(--color-primary);
  }
`;

const StyledMenuItem = styled(Menu.Item)`
`;


const MainLayout = () => {
  return (
    <BrowserRouter>
      <Layout>
        <StyledHeader className="header">
          <div className="logo" />
          <NavBar />
        </StyledHeader>
        <Layout>
          <StyledSider
            breakpoint="md"
            collapsedWidth="0"
          >
            <h6>Shopping Categories</h6>
            <Menu
              mode="inline"
              theme="light"
              style={{ height: "100%", borderRight: 0, textAlign: 'left' }}
            >
              <StyledMenuItem key="1">
                <StyledNavLink activeClassName="active" to="/">
                  <StyledIcon icon="cannabis" className="fas" />
                  <StyledSpan className="ml-2">All</StyledSpan>
                </StyledNavLink>
              </StyledMenuItem>
              <StyledMenuItem key="2">
                <StyledNavLink activeClassName="active" to="/indica">
                  <StyledIcon icon="couch" className="fas" />
                  <StyledSpan className="ml-2">Indica</StyledSpan>
                </StyledNavLink>
              </StyledMenuItem>
              <StyledMenuItem key="3">
                <StyledNavLink activeClassName="active" to="/sativa">
                  <StyledIcon icon="bolt" className="fas" />
                  <StyledSpan className="ml-2">Sativa</StyledSpan>
                </StyledNavLink>
              </StyledMenuItem>
              <StyledMenuItem key="4">
                <StyledNavLink activeClassName="active" to="/edibles" >
                  <StyledIcon icon="cookie-bite" className="fas" />
                  <StyledSpan className="ml-2">Edibles</StyledSpan>
                </StyledNavLink>
              </StyledMenuItem>
              <StyledMenuItem key="5">
                <StyledNavLink activeClassName="active" to="/rolls">
                  <StyledIcon icon="joint" className="fas" />
                  <StyledSpan className="ml-2">Rolls</StyledSpan>
                </StyledNavLink>
              </StyledMenuItem>
            </Menu>
          </StyledSider>
          <Layout >
            <Content
              style={{
                background: "#fff",
                padding: '24px',
                minHeight: '100vh'
              }}
            >
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default MainLayout;