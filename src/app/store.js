import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});