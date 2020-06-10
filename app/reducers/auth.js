import * as actionTypes from '@actions/actionTypes';
const initialState = {
  login: {
    isLoading: false,
    success: false,
    error: null,
  },
  register: {
    isLoading: false,
    success: false,
    error: null,
  },
  user: {
    lang: 'en',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: true,
          error: null,
        },
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: false,
          success: true,
        },
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: false,
          success: false,
          error: action.payload,
        },
      };
    case actionTypes.LOGOUT_START:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: true,
          error: null,
        },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        login: {
          isLoading: false,
          success: false,
          error: null,
        },
        user: initialState.user,
      };
    case actionTypes.LOGOUT_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: false,
          error: action.payload,
        },
      };
    case actionTypes.REGISTER_START:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: true,
          error: null,
        },
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: false,
          success: true,
          error: null,
        },
        login: {
          ...state.login,
          isLoading: false,
          success: true,
          error: null,
        },
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        register: {
          ...state.register,
          isLoading: false,
          success: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
