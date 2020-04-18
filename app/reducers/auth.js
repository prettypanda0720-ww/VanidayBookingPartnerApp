import * as actionTypes from '@actions/actionTypes';
const initialState = {
  login: {
    success: false,
  },
  user: {
    lang: 'en',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          success: true,
        },
        loginLoading: false,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        login: {
          success: false,
        },
        loginLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
