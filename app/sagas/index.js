import {fork} from 'redux-saga/effects';
import calendarSaga from './calendarSaga';
import authSaga from './authSaga';
import homeSaga from './homeSaga';

function* rootSaga() {
  yield fork(authSaga);
  yield fork(homeSaga);
  yield fork(calendarSaga);
}

export default rootSaga;
