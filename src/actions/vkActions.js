/*global VK*/
import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_USER_GROUPS,
  SET_CURRENT_GROUP,GET_PHOTO_SERVER_URL,GET_DOCS_SERVER_URL
} from "./types";
export const userLogin = () => dispatch => {
  dispatch(userLoginBegin());
  VK.Auth.login(res => {
    if (res.session) {
      dispatch(userLoginSuccess(res.session.user));
      dispatch(getUserGroups(res.session.user.id));
      dispatch(getDocsServerUrl());
    }
    if (res.error) {
      dispatch(userLoginFail(res.error));
    }
  }, 262144+4+131072);
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
export const getUserGroups = userId => dispatch => {
  VK.Api.call(
    "groups.get",
    { user_ids: userId, filter: "editor", extended: 1, v: "5.80" },
    response => {
      dispatch({
        type: GET_USER_GROUPS,
        payload: response.response.items
      });
    }
  );
};

export const setCurrentGroup = currentGroup => {
  return {
    type: SET_CURRENT_GROUP,
    payload: currentGroup
  };
};

export const getPhotoServerUrl = groupId => dispatch => {

  VK.Api.call(
    "photos.getWallUploadServer",
    { group_id: groupId, v: "5.80" },
    response => {
      dispatch({
        type: GET_PHOTO_SERVER_URL,
        payload: response.response.upload_url
      });
    }
  );
};export const getDocsServerUrl = () => dispatch => {

  VK.Api.call(
    "docs.getUploadServer",
    {  v: "5.80" },
    response => {
      dispatch({
        type: GET_DOCS_SERVER_URL,
        payload: response.response.upload_url
      });
    }
  );
};
