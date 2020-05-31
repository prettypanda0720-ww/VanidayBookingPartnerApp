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
  console.log('postdata');
  console.log(postData);
  // apiClient_json.defaults.headers.common.token = token;
  return apiClient_json.post(url, postData);
}

export const myAppointmentsSvc = {
  fetchOrderByDate,
};
