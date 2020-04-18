import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import reduxLogger from 'redux-logger';
import rootReducer from 'app/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '../sagas';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/**
 * Redux Setting
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 100000,
  stateReconciler: autoMergeLevel2,
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(reduxLogger, sagaMiddleware),
);

// run the saga
sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);
export default store;
