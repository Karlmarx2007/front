import React from 'react';
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
    <StyledMain>
      <StyledDiv>
        <h2 style={{ color: '#FFFF' }}>Welcome to <span style={{fontFamily: 'cursive'}}>Cannabis GO</span></h2>
        <div style={{maxWidth: '10rem'}}>
          <Link to='/all'><StyledButton label='Shop Cannabis' /></Link>
        </div>
      </StyledDiv>
    </StyledMain>
  )
}

export default Main;