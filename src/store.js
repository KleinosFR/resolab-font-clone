import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import connectedUsersReducer from "./reducers/connectedUsersReducer";
import socketReducer from "./reducers/socketReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({
    authReducer,
    userReducer,
    alertReducer,
    connectedUsersReducer,
    socketReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
