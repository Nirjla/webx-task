import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
      reducerPath: 'authApi',
      baseQuery: fetchBaseQuery({
            baseUrl: 'https://webx-task-api.vercel.app/api',
            prepareHeaders: (headers, { getState }) => {
                  // Get the token from localStorage or wherever you store it
                  const token = localStorage.getItem('token');
                  if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                  }
                  return headers;
            },
      }),
      endpoints: (builder) => ({
            login: builder.mutation({
                  query: (credentials) => ({
                        url: '/admin/signin',
                        method: 'POST',
                        body: credentials,
                  }),
                  async onQueryStarted(args, { dispatch, queryFulfilled }) {
                        try {
                              const { data } = await queryFulfilled;
                              // Save the token to localStorage or another store
                              localStorage.setItem('token', data.token);
                        } catch (error) {
                        }
                  },
            }),
            // Define other endpoints if needed
      }),
});

export const { useLoginMutation } = authApi;
