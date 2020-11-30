import types from "./types";

const NOW = (info) => {
  return {
    type: types.NOW,
    payload: info,
  };
};

export default { NOW };
