import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
      reducerPath: 'api',
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
            getCartItems: builder.query({
                  query: () => ({
                        url: '/cart',

                  })
            }),
            addToCart: builder.mutation({
                  query: (item) => ({
                        url: '/cart',
                        method: 'POST',
                        body: item
                  })
            }),
            deleteFromCart: builder.mutation({
                  query: (itemId) => ({
                        url: `/cart/${itemId}`,
                        method: 'DELETE',
                  })
            }),
            updateQuantity: builder.mutation({
                  query: ({ itemId, quantity }) => ({
                        url: `/cart/${itemId}`,
                        method: 'PUT',
                        body: { quantity }
                  })
            })

      })
})

export const { useGetCartItemsQuery, useAddToCartMutation, useDeleteFromCartMutation , useUpdateQuantityMutation} = cartApi