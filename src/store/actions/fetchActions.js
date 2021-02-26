import axios from "axios";

import { DESTINATION_COUNT } from "../../config/constants";
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

export const destinationsList = Array.from(
  Array(DESTINATION_COUNT),
  (_, index) => `Destination ${index + 1}`
);

export const getAvailablePlanets = (planets, selectedPlanets) => {
  return planets.filter((planet) => {
    return selectedPlanets.indexOf(planet.name) === -1;
  });
};

export const getAvailableVehicles = (vehicles, selectedVehicles) => {
  let availableVehiclesList = JSON.parse(JSON.stringify(vehicles));
  const vehicleObj = {};
  selectedVehicles.forEach((vehicle) => {
    vehicleObj[vehicle] = vehicleObj[vehicle] ? vehicleObj[vehicle] + 1 : 1;
  });
  availableVehiclesList.forEach((vehicle) => {
    if (selectedVehicles.indexOf(vehicle.name) > -1) {
      vehicle.total_no -= vehicleObj[vehicle.name];
    }
  });
  return availableVehiclesList;
};

export const isInRange = (
  selectedPlanets,
  planets,
  planetIndex,
  vehicleMaxDistance
) => {
  if (selectedPlanets.length) {
    const planet = selectedPlanets[planetIndex];
    if (!planet) return false;
    const { distance } = planets.filter(({ name }) => name === planet)[0];
    return distance <= vehicleMaxDistance;
  }
};
