/**
 * RTK Query: Song API Service
 *
 * This file configures all song-related API requests using Redux Toolkit Query.
 * It also attaches a Firebase ID token (if available) to secure API requests.
 * 
 * Features:
 * - Auto-generates React hooks for fetching songs
 * - Handles caching, loading, and error states automatically
 * - Uses Firebase Auth for token-based auth headers
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

/**
 * prepareHeaders
 * Attaches a Firebase ID token (if available) to the request headers.
 *
 * @param {Headers} headers - Request headers
 * @returns {Headers} Modified headers with `Authorization` if authenticated
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

// ✅ Create the song API service
export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/song`,
        prepareHeaders, // Attach token to headers
    }),
    tagTypes: ["Song"], // Define a generic tag
    endpoints: (builder) => ({
        // Define an endpoint for fetching all songs
        getSongs: builder.query({
            query: () => '/songs',
            transformResponse: (response) => response, // Optional: transform the API response
            providesTags: ["Song"], // Mark this query with "Song" tag
        }),
        // Define an endpoint for fetching a song by file name
        getSong: builder.query({
            query: (file) => `/song/${file}`,
            transformResponse: (response) => response, // Optional: transform the API response
            providesTags: ["Song"], // Mark this query with "Song" tag
        }),
    }),
});

// ✅ Auto-generated React hooks
export const { useGetSongsQuery, useLazyGetSongQuery } = songApi;
