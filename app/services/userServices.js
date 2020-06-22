import axios from 'axios';
import store from 'app/store';
import {Api} from '@config';

const normalConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

function login(body) {
  var postData = {
    username: body.email,
    password: body.password,
  };
  var url = Api.actionMode.isReal
    ? Api.myVaniday.API_BASE + Api.myVaniContent.LOGIN_URL
    : Api.myVaniMiddleWare.API_BASE + Api.myVaniContent.LOGIN_URL;
  return axios.post(url, postData, normalConfig);
}

function register(body) {
  var url = Api.actionMode.isReal
    ? Api.myVaniday.API_BASE + Api.myVaniContent.REGISTER_URL
    : Api.myVaniMiddleWare.API_BASE + Api.myVaniContent.REGISTER_URL;
  return axios.post(url, body, normalConfig);
}

function registerCustomer(body) {
  var url = Api.actionMode.isReal
    ? Api.myVaniday.API_BASE + Api.myVaniContent.REGISTER_CUSTOMER_URL
    : Api.myVaniMiddleWare.API_BASE + Api.myVaniContent.REGISTER_CUSTOMER_URL;
  return axios.post(url, body, normalConfig);
}

export const UserServices = {
  login,
  register,
  registerCustomer,
};
