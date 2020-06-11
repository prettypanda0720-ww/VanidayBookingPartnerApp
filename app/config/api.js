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
    REGISTER_URL: '/rest/V1/vaniday/vendor/create',
    GET_ORDER_URL: '/myvaniday/fetchOrderList',
    GET_PROFILE_DATA_URL: '/myvaniday/vendorDetail',
    UPDATE_PROFILE_DATA_URL: '/myvaniday/vendorProfile',
    GET_STAFFLIST_DATA_URL: '/myvaniday/getStaffList',
    DELETE_STAFFLIST_DATA_URL: '/myvaniday/deleteStaffList',
    CREATE_STAFFLIST_DATA_URL: '/myvaniday/createStaffList',
    UPDATE_STAFFLIST_DATA_URL: '/myvaniday/createStaffList',
    // services
    GET_SERVICELIST_DATA_URL: '/myvaniday/getServiceList',
    CREATE_SERVICELIST_DATA_URL: '/myvaniday/createService',
    UPDATE_SERVICELIST_DATA_URL: '/myvaniday/updateService',
    DELETE_SERVICELIST_DATA_URL: '/myvaniday/deleteService',
    SERVICE_DETAIL_DATA_URL: '/myvaniday/serviceDetail',
    GET_HOMECATEGORY_DATA_URL: '/getHomeCategory',
    GET_SUBMENU_BY_MERCHANT: '/getMerchantCategory',
    GET_ALLSERVICELIST_DATA_URL: '/myvaniday/getAllServiceList',
    // opening hour
    UPDATE_OPENINGHOURS_DATA_URL: '/myvaniday/updateOpeningHour',
    GET_OPENINGHOURS_DATA_URL: '/myvaniday/getOpeningHour',
    // product
    GET_PRODUCTLIST_DATA_URL: '/myvaniday/getProductList',
    GET_PRODUCTCATEGORY_DATA_URL: '/getProductCategory',
    CREATE_PRODUCT_DATA_URL: '/myvaniday/createProduct',
    DELETE_PRODUCT_DATA_URL: '/myvaniday/deleteProduct',
    UPDATE_PRODUCT_DATA_URL: '/myvaniday/updateProduct',
    DETAIL_PRODUCT_DATA_URL: '/myvaniday/productDetail',
    //Daily Sales
    FETCH_APPOINTMENT_DATA_URL: '/myvaniday/fetchAppointList',
    FETCH_INVOICE_DATA_URL: '/myvaniday/fetchInvoiceList',
  },
};
