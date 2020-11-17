import types from "../Actions/types";

const user = null;

const Auth = (state = user, action) => {
  switch (action.type) {
    case types.LOGIN:
      return action.payload;
    case types.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};

export default Auth;
