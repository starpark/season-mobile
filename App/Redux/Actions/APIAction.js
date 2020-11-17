import types from "./types";

const API_CALL = () => {
  return {
    type: types.API_CALL,
  };
};

const API_END = () => {
  return {
    type: types.API_END,
  };
};

export default { API_CALL, API_END };
