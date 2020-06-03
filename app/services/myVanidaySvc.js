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

export default {
  doLogin,
};
