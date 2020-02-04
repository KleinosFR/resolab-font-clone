import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

const initialAlertState = {
  alert: {}
};

const alertReducer = (state = initialAlertState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { alert: action.payload };
    case REMOVE_ALERT:
      return initialAlertState;
    default:
      return state;
  }
};

export default alertReducer;
