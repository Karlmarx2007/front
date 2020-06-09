import React from 'react';
import { useSelector } from 'react-redux';
import { IUserSignIn } from '../pages/signin';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );

  const getAuth = () => {
    if (userSignIn && userSignIn.userInfo) {
      return true;
    }
    return false;
  }
  return (
    <Route
      {...rest}
      render={
        props => getAuth() ? (
          <Component {...rest} {...props} />
        ) : (
            <Redirect to='/unauthorized'/>
        )
      }
    />
  )
}

export default ProtectedRoute;