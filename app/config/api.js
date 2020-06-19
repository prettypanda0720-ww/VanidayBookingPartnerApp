/**
 * Basic Setting Variables Define
 */
export const Api = {
  actionMode: {
    isReal: false,
  },
  myVaniday: {
    API_BASE: 'http://mapi2.vaniday.com/api',
    RAW_API_BASE: 'http://production.vaniday.com',
  },
  myVaniMiddleWare: {
    API_BASE: 'http://mapi.vaniday.com/api',
    RAW_API_BASE: 'http://v2.staging.vaniday.com',
  },
  myVaniContent: {
    LOGIN_URL: '/myvaniday/auth',
    REGISTER_URL: '/rest/V1/vaniday/vendor/create',
    UPDATE_CAROUSEL_DATA_URL: '/rest/V1/vaniday-vendor/update-carousel',
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
    GET_NEIGHTBOURHOODLIST_DATA_URL: '/getNeighbourhoodList',
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
    CREATE_PRODUCTHUMB_DATA_URL: '/myvaniday/createProductThumb',
    DELETE_PRODUCTHUMB_DATA_URL: '/myvaniday/deleteProductThumb',
    UPDATE_PRODUCTHUMB_DATA_URL: '/myvaniday/updateProductThumb',
    //Daily Sales
    FETCH_APPOINTMENT_DATA_URL: '/myvaniday/fetchAppointList',
    FETCH_INVOICE_DATA_URL: '/myvaniday/fetchInvoiceList',
    //Clients
    FETCH_CLIENTLIST_DATA_URL: '/myvaniday/fetchClientList',
    FETCH_CLIENTDETAIL_DATA_URL: '/myvaniday/fetchClientDetail',
    //profile
    DELETE_CAROUSEL_DATA_URL: '/rest/V1/vaniday-vendor/delete-carousel/',
    CONFIRM_APPOINTMENT_DATA_URL: '/rest/V1/vaniday/vendor-booking/approve/',
    CANCEL_APPOINTMENT_DATA_URL: '/rest/V1/vaniday/vendor-booking/reject/',
    RESCHEDULE_APPOINTMENT_DATA_URL:
      '/rest/V1/vaniday/vendor-booking/reschedule/',
    GET_ORDERINFO_DATA_URL: '/myvaniday/getOrderItemInfo',
    UPDATE_CAROUSEL_POSITION_DATA_URL:
      '/rest/V1/vaniday-vendor/update-carousel-position',
    FORGOTPASSWORD_DATA_URL: '/passwordReset',
    CHANGEPASSWORD_DATA_URL: '/passwordUpdate',
    VENDORSECTIONS_DATA_URL: '/getSections',
  },
};
