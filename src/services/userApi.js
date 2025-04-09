import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

// Get token function (you can use AsyncStorage for persistence in React Native)
const prepareHeaders = async (headers, { getState }) => {
  try {
    const currentUser = auth.currentUser;
    const token = await getIdToken(currentUser);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  } catch (error) {
    throw new error;
  }
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/user`, // Change to your server's base URL
    prepareHeaders, // Attach token to headers
  }),
  tagTypes: ["User"], // Define a generic tag
  endpoints: (builder) => ({
    // Define an endpoint for fetching a user by ID
    getUser: builder.query({
      query: () => '/user',
      transformResponse: (response) => response, // Optional: transform the API response
      providesTags: ["User"], // Mark this query with "User" tag
    }),
    // Define an endpoint for updating user
    createUser: builder.mutation({
      query: (data) => ({
        url: '/user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["User"], // Invalidate "User" tag to trigger a refetch
    }),
    createAdminUser: builder.mutation({
      query: (data) => ({
        url: '/userAdmin',
        method: 'POST'
      }),
      invalidatesTags: ["User"], // Invalidate "User" tag to trigger a refetch
    }),
    getInstruments: builder.query({
      query: () => '/instruments',
      headers: { skipAuth: 'true' },
      transformResponse: (response) => response, // Optional: transform the API response
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useCreateUserMutation, useCreateAdminUserMutation, useGetInstrumentsQuery } = userApi;
