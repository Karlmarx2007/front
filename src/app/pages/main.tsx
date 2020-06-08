import React, { Fragment } from 'react';
import { url } from 'inspector';
import styled from 'styled-components';
import background from '../../assets/images/background.jpg'
import StyledButton from '../components/styled-button';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding-top: 2rem;
  padding-left: 5rem;
`;

const StyledMain = styled.div`
  background-image: url(${background});
  background-size: 100% 100%;
  width: 100%px;
  height: 90vh;
  max-height: 1000px;
  margin-left: -5rem;
  margin-top: -1.5rem;
  margin-right: -1.5rem; 
  padding: 0;

  @media screen and (max-width: 576px){
    height: 50vh;

    ${StyledDiv} {
      & > h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

const Main = () => {
  return (
    <Fragment>
      <StyledMain>
        <StyledDiv>
          <h2 style={{ color: '#FFFF' }}>Welcome to <span style={{ fontFamily: 'cursive' }}>Cannabis GO</span></h2>
          <div style={{ maxWidth: '10rem' }}>
            <Link to='/all'><StyledButton label='Shop Cannabis' /></Link>
          </div>
        </StyledDiv>
      </StyledMain>
      <div>
        <h5 style={{ fontFamily: 'cursive', marginTop: '1rem' }}>About Us</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </Fragment>
  )
}

export default Main;