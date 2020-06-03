import {fork} from 'redux-saga/effects';
import calendarSaga from './calendarSaga';
import authSaga from './authSaga';

function* rootSaga() {
  yield fork(authSaga);
  yield fork(calendarSaga);
}

export default rootSaga;
