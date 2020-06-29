import {combineReducers} from 'redux';
import AuthReducer from './auth';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
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

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET_STORE) {
    AsyncStorage.removeItem('auth');
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('password');
    state = undefined;
  } else if (action.type === actionTypes.CHANGE_PASSWORD) {
    AsyncStorage.removeItem('password');
  }

  return appReducer(state, action);
};

export default rootReducer;
