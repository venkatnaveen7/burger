import * as actionTypes from "./actionTypes";
import * as URL_Constants from "../../utilConstatnts";
import axios from "axios";

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryTime");
  localStorage.removeItem("userid");
  return {
    type: actionTypes.LOG_OUT
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

const startAuthentication = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authenticationSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: data
  };
};

const authenticationFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.error
  };
};

const sessionTimeOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryTime");
  localStorage.removeItem("userid");
  return {
    type: actionTypes.SESSION_TIMEOUT
  };
};

export const tryAutoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("expiryTime");
    const userid = localStorage.getItem("userid");
    if (token == null) {
      dispatch(logOut());
    } else if (
      new Date(new Date().getTime() + expiryTime * 1000) < new Date()
    ) {
      dispatch(logOut());
    } else {
      let authData = {
        idToken: token,
        localId: userid,
        expiresIn: expiryTime
      };
      dispatch(authenticationSuccess(authData));
      dispatch(checkSessionTimeOut(expiryTime));
    }
  };
};

const checkSessionTimeOut = expiryTime => {
  return dispatch => {
    setTimeout(() => dispatch(sessionTimeOut()), expiryTime * 1000);
  };
};

export const authenticate = (username, password, isSignIn) => {
  return dispatch => {
    dispatch(startAuthentication());
    const data = {
      email: username,
      password: password,
      returnSecureToken: true
    };

    axios
      .post(
        !isSignIn
          ? URL_Constants.AUTH_SIGNIN_URL
          : URL_Constants.AUTH_SIGNUP_URL,
        data
      )
      .then(resp => {
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("expiryTime", resp.data.expiresIn);
        localStorage.setItem("userid", resp.data.localId);
        dispatch(authenticationSuccess(resp.data));
        dispatch(checkSessionTimeOut(resp.data.expiresIn));
      })
      .catch(e => {
        console.log("Auth Failed", e);
        dispatch(authenticationFail(e.response.data));
      });
  };
};
