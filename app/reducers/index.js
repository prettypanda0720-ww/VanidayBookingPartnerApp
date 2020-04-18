import {combineReducers} from 'redux';
import CalendarReducer from './calendar';
import AuthReducer from './auth';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const calendarPersistConfig = {
  key: 'calendar',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  calendar: persistReducer(calendarPersistConfig, CalendarReducer),
});
