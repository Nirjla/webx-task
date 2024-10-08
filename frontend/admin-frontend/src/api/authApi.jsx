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
            login: builder.mutation({
                  query: (credentials) => ({
                        url: '/admin/signin',
                        method: 'POST',
                        body: credentials,
                  }),
            }),
      }),
});

export const { useLoginMutation } = authApi;
