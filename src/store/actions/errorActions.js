import { GET_ERRORS, SET_ERRORS } from "./actionTypes";

export const getErrors = () => {
  return {
    type: GET_ERRORS,
  };
};

export const setErrors = (errorMessage) => {
  return {
    type: SET_ERRORS,
    payload: errorMessage,
  };
};
