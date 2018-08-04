import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../actions/types";
const initialState = {
  userData: {},
  status: "",
  isLogginIn: false,
  error: ""
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
        status: action.payload.status
      };
    default:
      return state;
  }
}
