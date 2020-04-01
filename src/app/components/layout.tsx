import React from 'react';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import NavBar from './navbar';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../routes/routes';



const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <NavBar />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ background: "#fff" }}
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
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
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 500
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