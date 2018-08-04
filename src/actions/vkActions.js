/*global VK*/
import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "./types";
export const userLogin = ()=> dispatch=>{
  dispatch(userLoginBegin());
  VK.Auth.login(res=>{
    if (res.session){
      dispatch(userLoginSuccess(res.session.user))
    }
    if (res.error) {
      dispatch(userLoginFail(res.error))
    }
  },262144)
};
export const userLoginBegin = () => {
  return {
    type: USER_LOGIN_BEGIN
  };
};
export const userLoginSuccess = userData => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userData
  };
};
export const userLoginFail = error => {
  return {
    type: USER_LOGIN_FAIL,
    payload: error
  };
};

export const userLogout = () => {
  return dispatch => {
    VK.Auth.logout(res => {
      dispatch({
        type: USER_LOGOUT,
        payload: res
      });
    });
  };
};
