/**
 * RTK Query: User API Service
 *
 * Handles all user-related API calls using Redux Toolkit Query.
 * Integrates Firebase authentication by attaching the ID token
 * to every request in the `Authorization` header.
 *
 * Endpoints:
 * - getUser          → Get current user from backend
 * - createUser       → Register new player
 * - createAdminUser  → Register new admin
 * - getInstruments   → Get available instruments (public)
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

/**
 * prepareHeaders
 * Attaches Firebase ID token (if available) to request headers.
 * Useful for securing backend APIs.
 */
const prepareHeaders = async (headers, { getState }) => {
  try {
    let token;
    const currentUser = auth.currentUser;
    if (currentUser) {
      token = await getIdToken(currentUser);
    } else {
      token = localStorage.getItem("token");
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  } catch (error) {
    throw new error;
  }
};

// ✅ Create the user API service
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/user`,
    prepareHeaders, // Attach token to headers
  }),
  tagTypes: ["User"], // Define a generic tag
  endpoints: (builder) => ({
    // Define an endpoint for fetching a user
    getUser: builder.query({
      query: () => '/user',
      transformResponse: (response) => response, // Optional: transform the API response
      providesTags: ["User"], // Mark this query with "User" tag
    }),
    // Define an endpoint for creating user
    createUser: builder.mutation({
      query: (data) => ({
        url: '/user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["User"], // Invalidate "User" tag to trigger a refetch
    }),
    // Define an endpoint for creating admin user
    createAdminUser: builder.mutation({
      query: (data) => ({
        url: '/userAdmin',
        method: 'POST'
      }),
      invalidatesTags: ["User"], // Invalidate "User" tag to trigger a refetch
    }),
    // Define an endpoint for getting the instruments list
    getInstruments: builder.query({
      query: () => '/instruments',
      transformResponse: (response) => response, // Optional: transform the API response
    }),
  }),
});

// ✅ Export generated hooks
export const { useGetUserQuery, useLazyGetUserQuery, useCreateUserMutation, useCreateAdminUserMutation, useGetInstrumentsQuery } = userApi;
