import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_USER_GROUPS,
  SET_CURRENT_GROUP,
  GET_PHOTO_SERVER_URL,
  GET_DOCS_SERVER_URL
} from "../actions/types";
const initialState = {
  userData: {},
  status: "",
  isLogginIn: false,
  error: "",
  groups: [],
  currentGroup: "",
  photoServerUrl:"",
  docsServerUrl:"",

};
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_BEGIN:
      return { ...state, isLogginIn: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogginIn: false,
        userData: action.payload,
        status: "connected"
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        userData: {},
        isLogginIn: false,
        error: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogginIn: false,
        userData: {},
        groups: [],
        currentGroup: "",
        photoServerUrl:"",
        docsServerUrl:"",
        status: action.payload.status
      };
    case GET_USER_GROUPS:
      return {
        ...state,
        groups: action.payload
      };
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload
      };
      case GET_PHOTO_SERVER_URL:
      return {
        ...state,
        photoServerUrl: action.payload
      };case GET_DOCS_SERVER_URL:
      return {
        ...state,
        docsServerUrl: action.payload
      };
    default:
      return state;
  }
}
