import {
  SET_PLANETS,
  SET_VEHICLES,
  INCREMENT_VEHICLE_COUNT,
  DECREMENT_VEHICLE_COUNT,
  SET_MISSION_RESULT,
  FIND_FALCONE_START,
  SET_ERRORS
} from "../actions/actionTypes";

import { updatedObject } from "../../shared/utility";

const initialState = {
  planets: [],
  vehicles: [],
  missionResult: {},
  loading: false
};

const setPlanets = (state, planets) => {
  return updatedObject(state, { planets, loading: false });
};

const setVehicles = (state, vehicles) => {
  return updatedObject(state, { vehicles });
};

const findFalconeStart = (state) => {
  return updatedObject(state, {
    loading: true
  });
};

// const updateVehicleCount = (state, vehicleName, updateVal) => {
//   const updatedVehicles = {
//     vehicles: state.vehicles.map((vehicle) => {
//       if (vehicle.name === vehicleName && vehicle.total_no) {
//         return { ...vehicle, total_no: vehicle.total_no + updateVal };
//       } else {
//         return { ...vehicle };
//       }
//     }),
//   };
//   return updatedObject(state, updatedVehicles);
// }

const setMissionResult = (state, missionResult) => {
  return updatedObject(state, { missionResult, loading: false });
};

const main = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PLANETS:
      return setPlanets(state, payload);
    case SET_VEHICLES:
      return setVehicles(state, payload);
    // case INCREMENT_VEHICLE_COUNT: return updateVehicleCount(state, payload, 1);
    // case DECREMENT_VEHICLE_COUNT: return updateVehicleCount(state, payload, -1);
    case INCREMENT_VEHICLE_COUNT:
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) => {
          if (vehicle.name === payload) {
            return { ...vehicle, total_no: vehicle.total_no + 1 };
          } else {
            return { ...vehicle };
          }
        })
      };
    case DECREMENT_VEHICLE_COUNT:
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) => {
          if (vehicle.name === payload && vehicle.total_no) {
            return { ...vehicle, total_no: vehicle.total_no - 1 };
          } else {
            return { ...vehicle };
          }
        })
      };
    case SET_MISSION_RESULT:
      return setMissionResult(state, payload);
    case FIND_FALCONE_START:
      return findFalconeStart(state);
    case SET_ERRORS:
      return updatedObject(state, {
        loading: false,
        planets: [],
        vehicles: []
      });
    default:
      return state;
  }
};
export default main;
