import { SET_CONNECTED_USERS } from "./actionTypes";

const initialAlertState = {
  connectedUsers: []
};

const connectedUsersReducer = (state = initialAlertState, action) => {
  switch (action.type) {
    case SET_CONNECTED_USERS:
      return { connectedUsers: action.payload };
    //   case REMOVE_ALERT:
    //     return initialAlertState;
    default:
      return state;
  }
};

export default connectedUsersReducer;
