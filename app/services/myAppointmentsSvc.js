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

function fetchOrderByDate(token, staffId, currentDate) {
  var url = Api.myVaniMiddleWare.GET_ORDER_URL;
  var postData = {
    token: token,
    staffId: -1,
    bookingDate: currentDate,
  };
  console.log('orders');
  console.log(postData);
  // apiClient_json.defaults.headers.common.token = token;
  return apiClient_json.post(url, postData);
}

function fetchProfileData(token, staffId, currentDate) {
  var url = Api.myVaniMiddleWare.GET_PROFILE_DATA_URL;
  var postData = {
    token: token,
  };
  console.log('profiledata');
  console.log(postData);
  return apiClient_json.post(url, postData);
}

function updateProfileData(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_PROFILE_DATA_URL;
  console.log('updateprofiledata');
  console.log(postData);
  return apiClient_json.post(url, postData);
}

function getStaffList(postData) {
  var url = Api.myVaniMiddleWare.GET_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function createStaffList(postData) {
  var url = Api.myVaniMiddleWare.CREATE_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function deleteStaffList(postData) {
  var url = Api.myVaniMiddleWare.DELETE_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function getServiceList(postData) {
  var url = Api.myVaniMiddleWare.GET_SERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

export const myAppointmentsSvc = {
  fetchOrderByDate,
  fetchProfileData,
  updateProfileData,
  getStaffList,
  getServiceList,
  deleteStaffList,
  createStaffList,
};
