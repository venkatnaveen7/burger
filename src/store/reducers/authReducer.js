import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util/Utility";
//import { logOut } from "../actions/auth";
const initialState = {
  loading: false,
  userId: null,
  token: null,
  error: null,
  authRedirectPath: "/"
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userId: action.data.localId,
    token: action.data.idToken,
    error: null
  });
};

const authFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error.message });
};

const logOut = state => {
  return updateObject(state, {
    userId: null,
    token: null
  });
};

const sessionTimeout = (state, action) => {
  return updateObject(state, {
    userId: null,
    token: null,
    error: actionTypes.SESSION_TIMEOUT
  });
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFailed(state, action);
    case actionTypes.SESSION_TIMEOUT:
      return sessionTimeout(state, action);
    case actionTypes.LOG_OUT:
      return logOut(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};
