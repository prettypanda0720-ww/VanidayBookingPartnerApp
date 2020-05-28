import {call, put, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '@actions/actionTypes';
import myVanidaySvc from '@services/myVanidaySvc';

function* fetchOrderByDate(action) {
  try {
    const {payload} = action;
    yield put({
      type: actionTypes.FETCH_MYVANIDAY_HOME_LOADING,
    });

    /** Scrapping web Data from vaniday.com */
    const res = yield call(
      myVanidaySvc.fetchOrderByDate,
      payload.token,
      payload.staffId,
      payload.bookingDate,
    );
    if (res.data.code == -1) {
      yield put({
        type: actionTypes.FETCH_MYVANIDAY_HOME_ERROR,
        payload,
      });
      return;
    }
    console.log('------order list ------');
    console.log(res.data.data);
    let myVanidayHomeData = res.data.data;
    yield put({
      type: actionTypes.FETCH_MYVANIDAY_HOME_SUCCESS,
      payload: myVanidayHomeData,
    });
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? {message: e} : e.data;
    yield put({
      type: actionTypes.FETCH_MYVANIDAY_HOME_ERROR,
      payload,
    });
  }
}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_MYVANIDAY_HOME_DATA, fetchOrderByDate);
}

export default homeSaga;
