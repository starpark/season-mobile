import types from "../Actions/types";

const API = (state = false, action) => {
  switch (action.type) {
    case types.API_CALL:
      return true;
    case types.API_END:
      return false;
    default:
      return state;
  }
};

export default API;
