import * as actionTypes from '@actions/actionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        code: action.payload.code,
        token: action.payload.data,
        message: action.payload.message,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        code: action.payload.code,
        token: action.payload.data,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
