import types from "./types";

const API_CALL = () => {
  return {
    type: types.API_CALL,
    payload: true,
  };
};

const API_END = () => {
  return {
    type: types.API_END,
    payload: false,
  };
};

export default { API_CALL, API_END };
