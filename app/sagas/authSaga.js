import {call, put, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import myVanidaySvc from '@services/myVanidaySvc';

function* loginTask(action) {
  console.log('auth saga is called!');
  try {
    const {payload} = action;
 
    yield put({
      type: actionTypes.AUTH_LOGIN_LOADING,
    });
    const res = yield call(
      myVanidaySvc.doLogin,
      payload.email,
      payload.password,
    );
    if (res.status === 200 && res.data.code == 0) {
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        payload: res.data,
      });
    } else if (res.data.code == -1){
      yield put({
        type: actionTypes.LOGIN_ERROR,
        payload: res.data,
      });
    }
  } catch (e) {
    const payload = typeof e === 'string' ? {message: e} : e.data;
    yield put({
      type: actionTypes.LOGIN_ERROR,
      payload: '',
    });
    console.log('http exception');
  }
}

function* authSaga() {
  yield takeLatest(actionTypes.LOGIN, loginTask);
}

export default authSaga;
