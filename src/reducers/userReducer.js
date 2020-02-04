import { SET_USER, LOG_OUT, NEW_MESSAGE } from "./actionTypes";

const initialUserState = {
  id: 0,
  username: "",
  firstname: "",
  lastname: "",
  roles: [],
  classroom: "",
  isRestricted: true,
  newMessage: false,
  isActive: false
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        roles: action.payload.roles,
        classroom: action.payload.classRoom,
        isRestricted: action.payload.isRestricted,
        isActive: action.payload.isActive
      };
    case LOG_OUT:
      return initialUserState;
    case NEW_MESSAGE:
      return {
        ...state,
        newMessage: true
      };
    default:
      return state;
  }
};

export default userReducer;
