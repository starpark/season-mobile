import types from "../Actions/types";

const Now = (state = null, action) => {
  switch (action.type) {
    case types.NOW:
      return action.payload;
    default:
      return state;
  }
};

export default Now;
