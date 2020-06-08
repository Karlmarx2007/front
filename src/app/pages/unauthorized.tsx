import React from 'react';
import styled from 'styled-components';
import StyledButton from '../components/styled-button';
import { Link } from 'react-router-dom';

const StyledMain = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
  font-size: 3rem;
  @media screen and (max-width: 992px){
    font-size: 2rem;
  };
  @media screen and (max-width: 750px){
    font-size: 1.5rem;
  };
  @media screen and (max-width: 576px){
    font-size: 1.2rem;
  }
   @media screen and (max-width: 375px){
    font-size: 1rem;
  }
`;
const Unauthorized = () => {
  return (
    <StyledMain>
      <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <StyledH1>401 UNAUTHORIZED</StyledH1>
        <div style={{maxWidth: '20rem', width: '60%'}}>
          <Link to='/'><StyledButton label='Ok' /></Link>
        </div>
      </div>
    </StyledMain>
  )
}

export default Unauthorized;