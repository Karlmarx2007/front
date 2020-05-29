import React from 'react';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import NavBar from './navbar';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
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
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0, textAlign: 'left' }}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <FontAwesomeIcon icon="cannabis" className="fas" />
                  <span className="ml-2">All</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/indica">
                  <FontAwesomeIcon icon="couch" className="fas" />
                  <span className="ml-2">Indica</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sativa">
                  <FontAwesomeIcon icon="bolt" className="fas" />
                  <span className="ml-2">Sativa</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/edibles" >
                  <FontAwesomeIcon icon="cookie-bite" className="fas" />
                  <span className="ml-2">Edibles</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/rolls">
                  <FontAwesomeIcon icon="joint" className="fas" />
                  <span className="ml-2">Rolls</span>
                </Link>
              </Menu.Item>
            </Menu>
          </StyledSider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
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