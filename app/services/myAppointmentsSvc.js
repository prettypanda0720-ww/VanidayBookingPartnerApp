import axios from 'axios';
import {Api} from '@config';

const baseUrl = Api.actionMode.isReal
  ? Api.myVaniday.API_BASE
  : Api.myVaniMiddleWare.API_BASE;

var rawBaseUrl = Api.actionMode.isReal
  ? Api.myVaniday.RAW_API_BASE
  : Api.myVaniMiddleWare.RAW_API_BASE;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/* API : Get Appointments*/
function fetchOrderByDate(token, staffId, currentDate) {
  var url = Api.myVaniContent.GET_ORDER_URL;
  var postData = {
    token: token,
    staffId: -1,
    bookingDate: currentDate,
  };
  return apiClient.post(url, postData);
}

/* API : Get Business Profile*/
function fetchProfileData(token, staffId, currentDate) {
  var url = Api.myVaniContent.GET_PROFILE_DATA_URL;
  var postData = {
    token: token,
  };
  console.log('tokentoken', postData);
  return apiClient.post(url, postData);
}

/* API : Update Business Profile*/
function updateProfileData(postData) {
  var url = Api.myVaniContent.UPDATE_PROFILE_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Get Staff Members List*/
function getStaffList(postData) {
  var url = Api.myVaniContent.GET_STAFFLIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Create Staff Member*/
function createStaffList(postData) {
  var url = Api.myVaniContent.CREATE_STAFFLIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Delete Staff Member*/
function deleteStaffList(postData) {
  var url = Api.myVaniContent.DELETE_STAFFLIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Update Staff Member*/
function updateStaffList(postData) {
  var url = Api.myVaniContent.UPDATE_STAFFLIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Get Service List*/
function getServiceList(postData) {
  var url = Api.myVaniContent.GET_SERVICELIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Create Service*/
function createServiceList(postData) {
  var url = Api.myVaniContent.CREATE_SERVICELIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Update Service*/
function updateServiceList(postData) {
  var url = Api.myVaniContent.UPDATE_SERVICELIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Delete Service*/
function deleteServiceList(postData) {
  var url = Api.myVaniContent.DELETE_SERVICELIST_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Service Detail*/
function serviceDetail(postData) {
  var url = Api.myVaniContent.SERVICE_DETAIL_DATA_URL;
  return apiClient.post(url, postData);
}

/* API : Get Categories for primary_type and secondary type field in Aboutus page*/
function getHomeCategory() {
  var url = baseUrl + Api.myVaniContent.GET_HOMECATEGORY_DATA_URL;
  return axios.get(url);
}

function getNeighbourhoodList() {
  var url = baseUrl + Api.myVaniContent.GET_NEIGHTBOURHOODLIST_DATA_URL;
  return axios.get(url);
}

function getOpeningHour(postData) {
  var url = baseUrl + Api.myVaniContent.GET_OPENINGHOURS_DATA_URL;
  return axios.post(url, postData);
}

function updateOpeningHour(postData) {
  var url = baseUrl + Api.myVaniContent.UPDATE_OPENINGHOURS_DATA_URL;
  return axios.post(url, postData);
}

function getSubMenuByMerchant(postData) {
  var url = Api.myVaniContent.GET_SUBMENU_BY_MERCHANT;

  return apiClient.post(url, postData);
}

function getProductList(postData) {
  var url = Api.myVaniContent.GET_PRODUCTLIST_DATA_URL;
  return apiClient.post(url, postData);
}

function createProductList(postData) {
  var url = Api.myVaniContent.CREATE_PRODUCT_DATA_URL;
  return apiClient.post(url, postData);
}

function deleteProductList(postData) {
  var url = Api.myVaniContent.DELETE_PRODUCT_DATA_URL;
  return apiClient.post(url, postData);
}

function updateProductList(postData) {
  var url = Api.myVaniContent.UPDATE_PRODUCT_DATA_URL;
  return apiClient.post(url, postData);
}

function productDetail(postData) {
  var url = Api.myVaniContent.DETAIL_PRODUCT_DATA_URL;

  return apiClient.post(url, postData);
}

function getProductCategory(postData) {
  var url = baseUrl + Api.myVaniContent.GET_PRODUCTCATEGORY_DATA_URL;
  return axios.get(url);
}

function getAllServiceList(postData) {
  var url = Api.myVaniContent.GET_ALLSERVICELIST_DATA_URL;
  return apiClient.post(url, postData);
}

function fetchInvoiceList(postData) {
  var url = Api.myVaniContent.FETCH_INVOICE_DATA_URL;
  return apiClient.post(url, postData);
}

function fetchAppointmentList(postData) {
  var url = Api.myVaniContent.FETCH_APPOINTMENT_DATA_URL;
  return apiClient.post(url, postData);
}

function updateCarousel(token, postData) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url = rawBaseUrl + Api.myVaniContent.UPDATE_CAROUSEL_DATA_URL;
  console.log('updateCarousel', url);
  return axios.post(url, postData, config);
}

function updateCarouselPosition(token, postData) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  };
  var url = rawBaseUrl + Api.myVaniContent.UPDATE_CAROUSEL_POSITION_DATA_URL;
  console.log('updateCarousel', url);
  return axios.post(url, postData, config);
}

function deleteCarouselAll(token) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  var url = rawBaseUrl + Api.myVaniContent.DELETE_CAROUSEL_DATA_URL + 'all';
  console.log('deleteCarouselAll', url);
  return axios.delete(url, config);
}

function deleteCarouselById(token, id) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  var url = rawBaseUrl + Api.myVaniContent.DELETE_CAROUSEL_DATA_URL + id;
  console.log('deleteCarouselById', url);
  return axios.delete(url, config);
}

function confirmAppointment(token, order_id) {
  console.log('confirmAppointment_orderid', order_id);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url =
    rawBaseUrl + Api.myVaniContent.CONFIRM_APPOINTMENT_DATA_URL + order_id;
  console.log('confirmAppointment', url);
  return axios.post(url, '', config);
}

function rescheduleAppointment(token, order_id, postData) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url =
    rawBaseUrl + Api.myVaniContent.RESCHEDULE_APPOINTMENT_DATA_URL + order_id;
  console.log('rescheduleAppointment', url);
  return axios.post(url, postData, config);
}

function rejectAppointment(token, order_id) {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url =
    rawBaseUrl + Api.myVaniContent.CANCEL_APPOINTMENT_DATA_URL + order_id;
  console.log('rejectAppointment', url);
  return axios.post(url, '', config);
}

function createProductThumb(token, postData) {
  // console.log('createProductThumb', token);
  // console.log('createProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url = baseUrl + Api.myVaniContent.CREATE_PRODUCTHUMB_DATA_URL;
  console.log('createProductThumb', url);
  return axios.post(url, postData, config);
}

function updateProductThumb(token, postData) {
  console.log('updateProductThumb', token);
  // console.log('updateProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  var url = baseUrl + Api.myVaniContent.UPDATE_PRODUCTHUMB_DATA_URL;
  console.log('updateProductThumb', url);
  return axios.post(url, postData, config);
}

function deleteProductThumb(token, postData) {
  console.log('deleteProductThumb', token);
  console.log('deleteProductThumb', postData);
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  var url = baseUrl + Api.myVaniContent.DELETE_PRODUCTHUMB_DATA_URL;
  console.log('deleteProductThumb', url);
  return axios.post(url, postData, config);
}

function fetchClientList(postData) {
  var url = Api.myVaniContent.FETCH_CLIENTLIST_DATA_URL;
  return apiClient.post(url, postData);
}

function fetchClientDetail(postData) {
  var url = Api.myVaniContent.FETCH_CLIENTDETAIL_DATA_URL;
  return apiClient.post(url, postData);
}

function getOrderItemInfo(postData) {
  var url = Api.myVaniContent.GET_ORDERINFO_DATA_URL;
  return apiClient.post(url, postData);
}

function fetchPersonalProfile(postData) {
  var url = Api.myVaniContent.GET_PERSONALPROFILE_DATA_URL;
  return apiClient.post(url, postData);
}

function updatePersonalProfile(postData) {
  var url = Api.myVaniContent.UPDATE_PERSONALPROFILE_DATA_URL;
  return apiClient.post(url, postData);
}

function forgotPassword(postData) {
  // const apiClient = axios.create({
  //   baseURL: Api.myVaniMiddleWare.API_BASE,
  //   // baseURL: Api.myVaniday.API_BASE,
  //   timeout: 30000,
  // });
  var url = Api.myVaniContent.FORGOTPASSWORD_DATA_URL;
  axios
    .create({
      baseURL: baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })
    .post(url, postData);

  // var url = Api.actionMode.isReal
  //   ? Api.myVaniday.API_BASE + Api.myVaniContent.FORGOTPASSWORD_DATA_URL
  //   : Api.myVaniMiddleWare.API_BASE + Api.myVaniContent.FORGOTPASSWORD_DATA_URL;
  // console.log(url, postData);
  // return axios.create
  //   .post(url, postData)
  //   .then((response) => {
  //     const res = response.data;
  //     console.log('forgotPassword', res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

function changePassword(postData) {
  var url = Api.myVaniContent.CHANGEPASSWORD_DATA_URL;
  return apiClient.post(url, postData);
}

function getVendorSections(postData) {
  var url = Api.myVaniContent.VENDORSECTIONS_DATA_URL;
  return apiClient.post(url, postData);
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
  rescheduleAppointment,
  rejectAppointment,
  confirmAppointment,
  deleteCarouselAll,
  deleteCarouselById,
  getOrderItemInfo,
  updateCarouselPosition,
  getNeighbourhoodList,
  forgotPassword,
  changePassword,
  getVendorSections,
  fetchPersonalProfile,
  updatePersonalProfile,
};
