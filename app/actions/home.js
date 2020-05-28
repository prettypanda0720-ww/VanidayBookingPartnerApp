import * as actionTypes from './actionTypes';

export const fetchAllHomeData = () => ({
  type: actionTypes.FETCH_MYVANIDAY_HOME_DATA,
});

export const fetchOrderByDate = (token, staffId, bookingDate) => ({
  type: actionTypes.FETCH_MYVANIDAY_HOME_DATA,
  payload: {
    token: token,
    staffId: staffId,
    bookingDate: bookingDate,
  },
});

