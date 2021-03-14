import { customerReducer, CUSTOMER_FEATURE_KEY } from '@react-app/customer';
import {
  authenticationReducer,
  AUTHENTICATION_FEATURE_KEY,
} from './authentication.slice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [CUSTOMER_FEATURE_KEY]: customerReducer,
    [AUTHENTICATION_FEATURE_KEY]: authenticationReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
