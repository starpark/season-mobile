import types from "./types";

const test1 = (n) => {
  return {
    type: types.TEST_1,
    payload: n,
  };
};

const test2 = (n) => {
  return {
    type: types.TEST_2,
    payload: n,
  };
};

export default { test1, test2 };
