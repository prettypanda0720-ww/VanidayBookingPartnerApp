import axios from 'axios';
import store from 'app/store';
import {Api} from '@config';

const apiClient_json = axios.create({
  baseURL: Api.myVaniMiddleWare.API_BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
},
  timeout: 30000,
});

function login(body) {
  var url = Api.myVaniMiddleWare.LOGIN_URL;
  var postData = {
    username: body.email,
    password: body.password,
  };
  return apiClient_json.post(url, postData);
}

export const UserServices = {
  login,
};
