import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

// Get token function (you can use AsyncStorage for persistence in React Native)
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

export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/song`, // Change to your server's base URL
        prepareHeaders, // Attach token to headers
    }),
    tagTypes: ["Song"], // Define a generic tag
    endpoints: (builder) => ({
        // Define an endpoint for fetching a user by ID
        getSongs: builder.query({
            query: () => '/songs',
            transformResponse: (response) => response, // Optional: transform the API response
            providesTags: ["Song"], // Mark this query with "User" tag
        }),
        getSong: builder.query({
            query: (file) => `/song/${file}`,
            transformResponse: (response) => response, // Optional: transform the API response
            providesTags: ["Song"], // Mark this query with "User" tag
        }),
    }),
});

export const { useGetSongsQuery, useLazyGetSongQuery } = songApi;
