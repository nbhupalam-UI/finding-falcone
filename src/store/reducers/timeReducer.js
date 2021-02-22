import { UPDATE_SEARCH_TIME } from "../actions/actionTypes";
import { updatedObject } from '../../shared/utility';

const initialState = {
  totalSearchTime: 0,
};

const updateTime = (state, totalSearchTime) => {
  return updatedObject(state, { totalSearchTime })
}

const time = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCH_TIME: return updateTime(state, payload);
    default: return state;
  }
};
export default time;
