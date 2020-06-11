import store from './store';
import Cookie from 'js-cookie';

import { signIn, logout } from './actions/user-actions';

const loginAuth = (payload: {email: string, password: string}) => {
  store.dispatch(signIn(payload))
}

const logoutAuth = () => {
  store.dispatch(logout());
  Cookie.remove('userInfo');
}

const isAuthenticated = (): boolean => {
  const state = store.getState();
  return !!state.userSignIn && !!(state.userSignIn as any).userInfo;
}

const isAdmin = () => {
  const state = store.getState();
  return !!state.userSignIn && !!(state.userSignIn as any).userInfo && !!(state.userSignIn as any).userInfo._doc.isAdmin;
}

export { loginAuth, logoutAuth, isAuthenticated, isAdmin };