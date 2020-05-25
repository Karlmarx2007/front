import React from 'react';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import NavBar from './navbar';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../routes/routes';
import styled from 'styled-components';

const StyledMain = styled.main`
  margin-left: 5rem;
  padding: 1rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  min-width: 2rem;
  margin-left: 0.3rem;
`;

const StyledLogoFontAwesomeIcon = styled(FontAwesomeIcon)`
  transform: rotate(0deg);
  transition: transform var(--transition-speed);
`;

const StyledLogo = styled.li`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
`;

const StyledSpan = styled.span`
  display: none;
  margin-left: 1rem;
  transition: var(650ms);
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const StyledA = styled.a`
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  text-decoration: none;
  filter: grayscale(100%) opacity(0.7);
  transition: var(--transition-speed);

  &:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }
`;

const StyledLogoText = styled.span`
  display: inline;
  position: absolute;
  left: -999px;
  margin-left: 0.5rem;
  transition: var(--transition-speed);
`;

const StyledNav = styled.nav`
  position: fixed;
  background-color: var(--bg-primary);
  transition: width 600ms ease;
  /* overflow: scroll; */

  @media only screen and (min-width: 600px) {
    top: 0;
    width: 5rem;
    height: 100vh;

    &:hover {
      width: 10rem;

      ${StyledSpan} {
        display: inline;
      }

      ${StyledLogoFontAwesomeIcon} {
        margin-left: 5rem;
        transform: rotate(-180deg);
      }

      ${StyledLogoText} {
        left: 0px;
      }
    }
  }

  @media only screen and (max-width: 600px){
    bottom: 0;
    width: 100vh;
    height: 5rem;

    ${StyledLogo} {
      display: none;
    }

    ${StyledUl} {
      flex-direction: row;
    }
    ${StyledA} {
      justify-content: center;
    }
    ${StyledMain} {
      margin: 0;
    }
  }
`;

const StyledLi = styled.li`
  width: 100%;

  &:last-child {
    margin-top: auto;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  text-decoration: none;
   &:hover {
    color:#138496;
  };

`;





const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  return (
    <BrowserRouter>
      <StyledNav className="navbar">
        <StyledUl className="navbar-nav">
          <StyledLogo className="logo">
            <StyledA className="nav-link">
              <StyledLogoText className="link-text logo-text">WC</StyledLogoText>
              <StyledLogoFontAwesomeIcon icon="angle-double-right" className="fas" size="2x"/>
            </StyledA>
          </StyledLogo>
          <StyledLi>
            <StyledLink to="/">
              <StyledFontAwesomeIcon icon="cannabis" className="fas" size="2x" />
              <StyledSpan className="link-text">All</StyledSpan>
            </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/sativa">
              <StyledFontAwesomeIcon icon="bolt" className="fas" size="2x" />
              <StyledSpan className="link-text">Sativa</StyledSpan>
            </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/indica">
              <StyledFontAwesomeIcon icon="couch" className="fas" size="2x" />
              <StyledSpan className="link-text">Indica</StyledSpan>
            </StyledLink>
          </StyledLi>
        </StyledUl>
      </StyledNav>
      <StyledMain>
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
      </StyledMain>
      {/* <Layout>
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
              console.log('broken >',broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log('collapsed >', collapsed, type);
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
      </Layout> */}
    </BrowserRouter>
  );
}

export default MainLayout;