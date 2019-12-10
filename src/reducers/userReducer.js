const initialUserState = {
  id: 0,
  username: "",
  firstname: "",
  lastname: "",
  roles: []
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        roles: action.payload.roles
      };
    case "REMOVE_USER":
      return initialUserState;
    default:
      return state;
  }
};

export default userReducer;
