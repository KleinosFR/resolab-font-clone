import { SET_SOCKET, REMOVE_SOCKET } from "./actionTypes";

const initialSocketState = {
  socket: {}
};

const socketReducer = (state = initialSocketState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { socket: action.payload };
    case REMOVE_SOCKET:
      return initialSocketState;
    default:
      return state;
  }
};

export default socketReducer;
