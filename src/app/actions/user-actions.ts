import axios from 'axios';
import Cookie from 'js-cookie';

import { USER } from '../constants/userConstants';

const signIn = (signInValues: { email: string, password: string }) => async (dispatch: any) => {
  dispatch({ type: USER.USER_SIGNIN_REQUEST, payload: signInValues });
  try {
    const { data } = await axios.post(`/users/signin`, signInValues);
    dispatch({ type: USER.USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER.USER_SIGNIN_FAIL, payload: 'Oops... Invalid username or password' });
  }
}

const signUp = (signUpValues: { name: string, email: string, password: string, repeatPassword: string }) => async (dispatch: any) => {
  dispatch({ type: USER.USER_SIGNUP_REQUEST, payload: signUpValues });
  try {
    const { data } = await axios.post(`/users/signup`, signUpValues);
    dispatch({ type: USER.USER_SIGNUP_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER.USER_SIGNUP_FAIL, payload: 'Oops... Error signing up' })
  }
}

const logout = () => async (dispatch: any) => {
  dispatch({ type: USER.USER_LOGOUT_REQUEST });
  dispatch({ type: USER.USER_LOGOUT_SUCCESS });
}

export { signIn, signUp, logout };