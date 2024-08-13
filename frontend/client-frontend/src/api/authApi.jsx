import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
      reducerPath: 'authApi',
      baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_API_URL,
            prepareHeaders: (headers, { getState }) => {
                  const token = getState().auth.token; // Access token from state
                  if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                  }
                  return headers;
            },
      }),

      endpoints: (builder) => ({
            register: builder.mutation({
                  query: (userDat) => ({
                        url: '/user/signup',
                        method: 'POST',
                        body: userDat
                  })
            }),
            login: builder.mutation({
                  query: (credentials) => ({
                        url: '/user/signin',
                        method: 'POST',
                        body: credentials,
                  }),

            }),
      }),

      // Define other endpoints if needed
});

export const { useLoginMutation, useRegisterMutation } = authApi;
