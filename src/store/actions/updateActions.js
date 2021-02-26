import {
  INCREMENT_VEHICLE_COUNT,
  DECREMENT_VEHICLE_COUNT,
  UPDATE_SEARCH_TIME
} from "./actionTypes";

export const incrementVehicleCount = (vehicleName) => {
  return {
    type: INCREMENT_VEHICLE_COUNT,
    payload: vehicleName
  };
};

export const decrementVehicleCount = (vehicleName) => {
  return {
    type: DECREMENT_VEHICLE_COUNT,
    payload: vehicleName
  };
};

export const updateTotalSearchTime = (time) => {
  return {
    type: UPDATE_SEARCH_TIME,
    payload: time
  };
};

export const isAllSelected = (selectedPlanets, selectedVehicles) => {
  const selectedPlanetCount = selectedPlanets.reduce((count, current) => {
    return current ? ++count : count;
  }, 0);
  const selectedVehicleCount = selectedVehicles.reduce((count, current) => {
    return current ? ++count : count;
  }, 0);
  return selectedPlanetCount === 4 && selectedVehicleCount === 4;
};
