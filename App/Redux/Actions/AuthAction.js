import types from "./types";

const LOGIN = (info) => {
  return {
    type: types.LOGIN,
    payload: info,
  };
};

const LOGOUT = () => {
  return {
    type: types.LOGOUT,
    payload: null,
  };
};

export default { LOGIN, LOGOUT };
