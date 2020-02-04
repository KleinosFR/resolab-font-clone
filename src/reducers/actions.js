import {
  LOGIN,
  SET_USER,
  LOG_OUT,
  SET_ALERT,
  REMOVE_ALERT,
  SET_SOCKET,
  SET_CONNECTED_USERS
} from "./actionTypes";

export const storeToken = token => dispatch => {
  dispatch({ type: LOGIN, payload: token });
  sessionStorage.setItem("token", token);
  return;
};

export const setUser = user => dispatch => {
  return dispatch({ type: SET_USER, payload: user });
};

export const removeToken = () => dispatch => {
  dispatch({ type: LOG_OUT });
  sessionStorage.clear("token");
  return;
};

export const setAlert = alert => dispatch => {
  return dispatch({ type: SET_ALERT, payload: alert });
};

export const removeAlert = () => dispatch => {
  return dispatch({ type: REMOVE_ALERT });
};

export const storeSocket = socket => dispatch => {
  return dispatch({ type: SET_SOCKET, payload: socket });
};

export const setConnectedUsers = connectedUsers => dispatch => {
  return dispatch({ type: SET_CONNECTED_USERS, payload: connectedUsers });
};
