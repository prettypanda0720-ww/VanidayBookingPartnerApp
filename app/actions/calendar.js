import * as actionTypes from './actionTypes';

export const setCalendarViewMode = (mode) => ({
  type: actionTypes.CALENDAR_VIEW_MODE,
  payload: {
    mode,
  },
});
