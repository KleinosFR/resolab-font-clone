import { LOGIN, LOG_OUT } from "./actionTypes";

const initialAuthState = {
  token: "",
  isAuth: false
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload, isAuth: true };
    case LOG_OUT:
      return initialAuthState;
    default:
      return state;
  }
};

export default authReducer;
