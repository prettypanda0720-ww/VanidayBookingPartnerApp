import * as actionTypes from './actionTypes';
// import { UserServices } from '@services';
import {UserServices} from '../services';

const onLoginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

const onLoginSuccess = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  };
};

const onLoginError = (payload) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload,
  };
};

const onLogoutStart = () => {
  return {
    type: actionTypes.LOGOUT_START,
  };
};

const onLogoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const onLogoutError = (payload) => {
  return {
    type: actionTypes.LOGOUT_ERROR,
    payload,
  };
};

const onRegisterStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

const onRegisterSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

const onRegisterError = (payload) => {
  return {
    type: actionTypes.REGISTER_ERROR,
    payload,
  };
};

const onProfileImage = (payload) => {
  return {
    type: actionTypes.SAVE_PROFILE_IMAGE,
    payload,
  };
};

const onUpdateName = (payload) => {
  return {
    type: actionTypes.SAVE_PROFILE_NAME,
    payload,
  };
};

export const login = (loginCredential, callback) => (dispatch) => {
  dispatch(onLoginStart());
  UserServices.login(loginCredential)
    .then((response) => {
      if (response.data.code === 0) {
        // const payload = {
        //   token: response.data.data,
        // };
        dispatch(onLoginSuccess(response));
      } else {
        dispatch(onLoginError(response));
      }
      callback(response);
    })
    .catch((error) => {
      dispatch(onLoginError(error.response));
      callback(error.response);
    });
};

export const logout = (callback) => (dispatch) => {
  dispatch(onLogoutStart());

  // UserServices.logout()
  //   .then((response) => {
  // console.log('--------- logout response from auth action', response);
  // if (response.data.success === 1) {
  dispatch(onLogoutSuccess());
  //   } else {
  //     dispatch(onLogoutError(response.data.msg));
  //   }
  callback({code: 0});
  // })
  // .catch((error) => {
  //   dispatch(onLogoutError(error.response));
  //   callback(error.response);
  // });
};

export const register = (body, callback) => (dispatch) => {
  dispatch(onRegisterStart());

  UserServices.register(body)
    .then((response) => {
      console.log('register response from auth action', response.data);
      // if (response.data.success === true) {
      //   const payload = {
      //     ...response.data.data,
      //   };
      //   dispatch(onRegisterSuccess(payload));
      // } else {
      //   dispatch(onRegisterError(response.data.msg));
      // }
      callback(response.data);
    })
    .catch((error) => {
      dispatch(onRegisterError(error.response));
      callback(error.response);
    });
};

export const saveProfileImage = (profile_image, callback) => (dispatch) => {
  dispatch(onProfileImage(profile_image));
};

export const updateName = (name, callback) => (dispatch) => {
  dispatch(onUpdateName(name));
};
