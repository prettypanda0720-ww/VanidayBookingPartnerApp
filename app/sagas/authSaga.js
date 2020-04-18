import {call, put, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';

function* loginTask(action) {
  try {
    const {payload} = action;

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
    });
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? {message: e} : e.data;
    yield put({
      type: actionTypes.LOGIN_ERROR,
      payload,
    });
  }
}

function* authSaga() {
  yield takeLatest(actionTypes.LOGIN, loginTask);
}

export default authSaga;
