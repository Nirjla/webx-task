import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkoutApi = createApi({
      reducerPath: 'checkoutApi',
      baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_API_URL,
            prepareHeaders: (headers, { getState }) => {
                  const token = getState().auth.token; // Access token from state
                  if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                  }
                  return headers;
            },
      }), endpoints: (builder) => ({
            checkout: builder.mutation({
                  query: (order) => ({
                        url: '/checkout',
                        method: 'POST',
                        body: order,
                  }),
            }),
      }),
});

export const { useCheckoutMutation } = checkoutApi;
