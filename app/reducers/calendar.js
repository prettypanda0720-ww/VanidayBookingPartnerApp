import * as actionTypes from '@actions/actionTypes';
const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CALENDAR_MODE_SUCCESS:
      return {
        ...state,
        calendarViewMode: action.payload,
      };
    default:
      return state;
  }
};
