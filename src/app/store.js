/**
 * Redux Store Configuration for JaMoveo App
 *
 * - Uses Redux Toolkit's `configureStore` for clean setup.
 * - Integrates RTK Query APIs for users and songs (data fetching/caching).
 * - Includes authentication reducer to manage Firebase-based login state.
 */
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