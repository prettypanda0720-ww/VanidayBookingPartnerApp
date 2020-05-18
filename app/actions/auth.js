import * as actionTypes from './actionTypes';

export const authentication = (email, password) => ({
  type: actionTypes.LOGIN,
  payload: {
    email,
    password,
  },
});

export const resetStore = () => ({
  type: actionTypes.RESET_STORE,
});
