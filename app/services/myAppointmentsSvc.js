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

/* API : Update Staff Member*/
function updateStaffList(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_STAFFLIST_DATA_URL;
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

/* API : Service Detail*/
function serviceDetail(postData) {
  var url = Api.myVaniMiddleWare.SERVICE_DETAIL_DATA_URL;
  return apiClient_json.post(url, postData);
}

/* API : Get Categories for primary_type and secondary type field in Aboutus page*/
function getHomeCategory() {
  var url = Api.myVaniMiddleWare.GET_HOMECATEGORY_DATA_URL;
  return apiClient.get(url);
}

function getOpeningHour(postData) {
  var url = Api.myVaniMiddleWare.GET_OPENINGHOURS_DATA_URL;
  return apiClient.post(url, postData);
}

function updateOpeningHour(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_OPENINGHOURS_DATA_URL;
  return apiClient.post(url, postData);
}

function getSubMenuByMerchant(postData) {
  var url = Api.myVaniMiddleWare.GET_SUBMENU_BY_MERCHANT;
  return apiClient_json.post(url, postData);
}

function getProductList(postData) {
  var url = Api.myVaniMiddleWare.GET_PRODUCTLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function createProductList(postData) {
  var url = Api.myVaniMiddleWare.CREATE_PRODUCT_DATA_URL;
  return apiClient_json.post(url, postData);
}

function deleteProductList(postData) {
  var url = Api.myVaniMiddleWare.DELETE_PRODUCT_DATA_URL;
  return apiClient_json.post(url, postData);
}

function updateProductList(postData) {
  var url = Api.myVaniMiddleWare.UPDATE_PRODUCT_DATA_URL;
  return apiClient_json.post(url, postData);
}

function productDetail(postData) {
  var url = Api.myVaniMiddleWare.DETAIL_PRODUCT_DATA_URL;
  return apiClient_json.post(url, postData);
}

function getProductCategory(postData) {
  var url = Api.myVaniMiddleWare.GET_PRODUCTCATEGORY_DATA_URL;
  return apiClient.get(url);
}

function getAllServiceList(postData) {
  var url = Api.myVaniMiddleWare.GET_ALLSERVICELIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function fetchInvoiceList(postData) {
  var url = Api.myVaniMiddleWare.FETCH_INVOICE_DATA_URL;
  return apiClient_json.post(url, postData);
}

function fetchAppointmentList(postData) {
  var url = Api.myVaniMiddleWare.FETCH_APPOINTMENT_DATA_URL;
  return apiClient_json.post(url, postData);
}

function updateCarousel(token, postData) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios.post(
    'http://v2.staging.vaniday.com/rest/V1/vaniday-vendor/update-carousel',
    postData,
    config,
  );
}

function createProductThumb(token, postData) {
  // console.log('createProductThumb', token);
  // console.log('createProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios.post(
    'http://mapi.vaniday.com/api/myvaniday/createProductThumb',
    postData,
    config,
  );
}

function updateProductThumb(token, postData) {
  console.log('updateProductThumb', token);
  // console.log('updateProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios.post(
    'http://mapi.vaniday.com/api/myvaniday/updateProductThumb',
    postData,
    config,
  );
}

function deleteProductThumb(token, postData) {
  console.log('deleteProductThumb', token);
  console.log('deleteProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios.post(
    'http://mapi.vaniday.com/api/myvaniday/deleteProductThumb',
    postData,
    config,
  );
}

function fetchClientList(postData) {
  var url = Api.myVaniMiddleWare.FETCH_CLIENTLIST_DATA_URL;
  return apiClient_json.post(url, postData);
}

function fetchClientDetail(postData) {
  var url = Api.myVaniMiddleWare.FETCH_CLIENTDETAIL_DATA_URL;
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
  updateStaffList,
  getHomeCategory,
  createServiceList,
  getOpeningHour,
  updateOpeningHour,
  getSubMenuByMerchant,
  updateServiceList,
  deleteServiceList,
  serviceDetail,
  getProductList,
  createProductList,
  deleteProductList,
  updateProductList,
  productDetail,
  getProductCategory,
  getAllServiceList,
  fetchInvoiceList,
  fetchAppointmentList,
  updateCarousel,
  updateProductThumb,
  deleteProductThumb,
  createProductThumb,
  fetchClientList,
  fetchClientDetail,
};
