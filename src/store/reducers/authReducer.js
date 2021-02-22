import { SET_API_TOKEN } from "../actions/actionTypes";
import { updatedObject } from '../../shared/utility';

const initialState = {
  token: "",
};

const setToken = (state, token) => {
  return updatedObject(state, { token });
}

const auth = (state = initialState, { type, token }) => {
  switch (type) {
    case SET_API_TOKEN: return setToken(state, token);
    default: return state;
  }
};

export default auth;
