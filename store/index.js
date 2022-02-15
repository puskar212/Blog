import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// import authReducer from './auth';
// import userReducer from './user';
import settingsReducer from './settings';

const middleware = [...getDefaultMiddleware()];

const rootReducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  settings : settingsReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export default store;
