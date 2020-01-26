import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import connectedUsersReducer from "./reducers/connectedUsersReducer";
import socketReducer from "./reducers/socketReducer";
import thunk from "redux-thunk";


//const store = createStore(
//  combineReducers({
//    authReducer,
//    userReducer,
//    alertReducer,
//    connectedUsersReducer,
//    socketReducer
//  }),
//  compose(
//    applyMiddleware(thunk),
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  )
//);



const store = createStore(
  combineReducers({
    authReducer,
    userReducer,
    alertReducer,
    connectedUsersReducer,
    socketReducer
  }),
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
