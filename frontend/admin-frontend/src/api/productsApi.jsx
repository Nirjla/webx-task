import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
      reducerPath: 'productApi',
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