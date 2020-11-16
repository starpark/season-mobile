import types from "../Actions/types";

const count = 0;

const test = (state = count, action) => {
  switch (action.type) {
    case types.TEST_1:
      return state + action.payload;
    case types.TEST_2:
      return state - action.payload;
    default:
      return state;
  }
};

export default test;
