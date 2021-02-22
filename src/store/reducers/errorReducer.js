import { GET_ERRORS, SET_ERRORS } from "../actions/actionTypes";
import { updatedObject } from '../../shared/utility';

const initialState = {
  isErrorbarOpen: false,
  errorText: "",
};

function setErrors(state, action) {
  const updatedState = updatedObject(state, {
    isErrorbarOpen: action.payload ? true : false,
    errorText: action.payload,
  });
  return updatedState;
}

const error = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS: return setErrors(state, action);
    case GET_ERRORS: return state;
    default: return state;
  }
};

export default error;
