import axios from "axios";

import {
  PLANET_API,
  VEHICLE_API,
  FIND_FALCONE_API
} from "../../config/apiUrls";
import { SET_VEHICLES, SET_PLANETS, SET_MISSION_RESULT } from "./actionTypes";
import { setErrors } from "./errorActions";

export const fetchPlanets = () => (dispatch) => {
  axios
    .get(PLANET_API)
    .then((res) => {
      dispatch({
        type: SET_PLANETS,
        payload: res.data
      });
    })
    .catch((err) => dispatch(setErrors(err.message)));
};

export const fetchVehicles = () => (dispatch) => {
  axios
    .get(VEHICLE_API)
    .then((res) => {
      dispatch({
        type: SET_VEHICLES,
        payload: res.data
      });
    })
    .catch((err) => dispatch(setErrors(err.message)));
};

export const findFalcone = ({ requestData, history }) => (dispatch) => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios
    .post(FIND_FALCONE_API, requestData)
    .then((res) => {
      dispatch({
        type: SET_MISSION_RESULT,
        payload: res.data
      });
      history.push("/report");
    })
    .catch((err) => dispatch(setErrors(err.message)));
};
