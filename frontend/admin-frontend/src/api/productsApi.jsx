import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
      reducerPath: 'productApi',
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
            getProducts: builder.query({
                  query: () => '/product'
            }),
            createProduct: builder.mutation({
                  query: (newProduct) => ({
                        url: '/product',
                        method: 'POST',
                        body: newProduct
                  })
            })
      })
})

export const { useGetProductsQuery, useCreateProductMutation } = productApi