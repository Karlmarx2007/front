import { USER } from "../constants/userConstants";

export function userSignInReducer(state = {}, action: { type: USER, payload: any }) {
  const { type, payload } = action;

  switch (type) {
    case USER.USER_SIGNIN_REQUEST:
      return { loading: true };
    
    case USER.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: payload };
    
    case USER.USER_SIGNIN_FAIL:
      return { loading: false, error: payload };
    
    case USER.USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER.USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: payload };

    case USER.USER_SIGNUP_FAIL:
      return { loading: false, error: payload };
    
    case USER.USER_LOGOUT_REQUEST:
      return { loading: true };

    case USER.USER_LOGOUT_SUCCESS:
      return { }
    
    default:
      return state;
  }
}

// export function userLogoutReducer(state = {}, action: any) {
//   const { type, payload, error } = action;
//   switch (type) {
//     case USER.USER_LOGOUT_REQUEST:
//       return { loading: true };
    
//     case USER.USER_LOGOUT_SUCCESS:
//       return { userInfo: {} }
    
//     default:
//       return state;
//   }
// }