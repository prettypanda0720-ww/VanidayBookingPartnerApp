import request from '@utils/request';
import store from 'app/store';
import {Api} from '@config';

function doLogin(email, password) {
  const data = {
    username: email,
    password: password,
  };

  return request(Api.myVaniMiddleWare.API_BASE, {
    url: Api.myVaniMiddleWare.LOGIN_URL,
    method: 'POST',
    data,
  });
}

function fetchOrderByDate(staffId, currentDate) {
  var url = Api.myVaniMiddleWare.GET_ORDER_URL;
  // const token = store.getState().auth.token;
  const data = {
    // token: token,
    staffId: staffId,
    bookingDate: currentDate,
  };

  return request(Api.myVaniMiddleWare.API_BASE, {
    url: url,
    method: 'POST',
    data: data,
  });
}

export default {
  doLogin,
  fetchOrderByDate,
};
