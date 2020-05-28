import {combineReducers} from 'redux';
import CalendarReducer from './calendar';
import AuthReducer from './auth';
import HomeReducer from './home';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import * as actionTypes from '@actions/actionTypes';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const calendarPersistConfig = {
  key: 'calendar',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  home: persistReducer(homePersistConfig, HomeReducer),
  calendar: persistReducer(calendarPersistConfig, CalendarReducer),
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
