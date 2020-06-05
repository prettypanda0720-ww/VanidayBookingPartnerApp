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

const apiClient = axios.create({
  baseURL: Api.myVaniMiddleWare.API_BASE,
  timeout: 30000,
});
/* API : Get Appointments*/
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

/* API : Get Business Profile*/
function fetchProfileData(token, staffId, currentDate) {
  var url = Api.myVaniMiddleWare.GET_PROFILE_DATA_URL;
  var postData = {
    token: token,
  };
  console.log('profiledata');
  console.log(postData);
  return apiClient_json.post(url, postData);
}

/* API : Update Business Profile*/
function updateProfileData(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_PROFILE_DATA_URL;
  console.log('updateprofiledata');
  console.log(postData);
  return apiClient_json.post(url, postData);
}

/* API : Get Staff Members List*/
function getStaffList(postData) {
  var url = Api.myVaniMiddleWare.GET_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Create Staff Member*/
function createStaffList(postData) {
  var url = Api.myVaniMiddleWare.CREATE_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Delete Staff Member*/
function deleteStaffList(postData) {
  var url = Api.myVaniMiddleWare.DELETE_STAFFLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Get Service List*/
function getServiceList(postData) {
  var url = Api.myVaniMiddleWare.GET_SERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Create Service*/
function createServiceList(postData) {
  var url = Api.myVaniMiddleWare.CREATE_SERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Update Service*/
function updateServiceList(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_SERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Delete Service*/
function deleteServiceList(postData) {
  var url = Api.myVaniMiddleWare.DELETE_SERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Get Categories for primary_type and secondary type field in Aboutus page*/
function getHomeCategory() {
  var url = Api.myVaniMiddleWare.GET_HOMECATEGORY_DATA_URL;
  return apiClient.get(url);
}

function updateOpeningHours() {
  var url = Api.myVaniMiddleWare.UPDATE_OPENINGHOURS_DATA_URL;
  return apiClient.get(url);
}

function getSubMenuByMerchant(postData) {
  var url = Api.myVaniMiddleWare.GET_SUBMENU_BY_MERCHANT;
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
  getHomeCategory,
  createServiceList,
  updateOpeningHours,
  getSubMenuByMerchant,
  updateServiceList,
  deleteServiceList,
};
