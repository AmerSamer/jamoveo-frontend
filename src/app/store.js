import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import authReducer from '../features/auth/authSlice';
import { songApi } from '../services/songApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, songApi.middleware),
});