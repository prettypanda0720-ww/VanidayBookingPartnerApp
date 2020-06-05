/**
 * Basic Setting Variables Define
 */
export const Api = {
  myVaniday: {
    API_BASE: 'https://production.vaniday.com/',
  },
  myVaniMiddleWare: {
    // API_BASE: 'http://192.168.6.227/api/myvaniday',
    API_BASE: 'http://mapi.vaniday.com/api',
    MEDIA_BASE: 'http://v2.staging.vaniday.com/media/avatar/',
    LOGIN_URL: '/myvaniday/auth',
    GET_ORDER_URL: '/myvaniday/fetchOrderList',
    GET_PROFILE_DATA_URL: '/myvaniday/vendorDetail',
    UPDATE_PROFILE_DATA_URL: '/myvaniday/vendorProfile',
    GET_STAFFLIST_DATA_URL: '/myvaniday/getStaffList',
    DELETE_STAFFLIST_DATA_URL: '/myvaniday/deleteStaffList',
    CREATE_STAFFLIST_DATA_URL: '/myvaniday/createStaffList',
    // services
    GET_SERVICELIST_DATA_URL: '/myvaniday/getServiceList',
    CREATE_SERVICELIST_DATA_URL: '/myvaniday/createService',
    UPDATE_SERVICELIST_DATA_URL: '/myvaniday/updateService',
    DELETE_SERVICELIST_DATA_URL: '/myvaniday/deleteService',
    GET_HOMECATEGORY_DATA_URL: '/getHomeCategory',
    UPDATE_OPENINGHOURS_DATA_URL: '/updateOpeningHours',
    GET_SUBMENU_BY_MERCHANT: '/getMerchantCategory',
  },
};
