import {call, put, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';

function* calendarViewMode(action) {
  const {payload} = action;
  yield put({
    type: actionTypes.CALENDAR_MODE_SUCCESS,
    payload: payload.mode,
  });
}

function* calendarSaga() {
  yield takeLatest(actionTypes.CALENDAR_VIEW_MODE, calendarViewMode);
}

export default calendarSaga;
