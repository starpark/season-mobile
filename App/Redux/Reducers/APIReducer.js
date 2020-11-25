import types from "../Actions/types";

const Api = (state = false, action) => {
  switch (action.type) {
    case types.API_CALL:
      return action.payload;
    case types.API_END:
      return action.payload;
    default:
      return state;
  }
};

export default Api;
