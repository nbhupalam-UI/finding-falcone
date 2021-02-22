import axios from "axios";

import { AUTH_TOKEN_URL } from "../../config/apiUrls";
import { SET_API_TOKEN } from "./actionTypes";

import { setErrors } from "./errorActions";

export const fetchAuthToken = () => (dispatch) => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios
    .post(AUTH_TOKEN_URL)
    .then((res) => {
      dispatch({ type: SET_API_TOKEN, token: res.data.token });
    })
    .catch((err) => dispatch(setErrors(err.message)));
};
