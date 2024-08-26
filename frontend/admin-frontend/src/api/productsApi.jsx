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
                  query: () => '/products'
            }),
            getCategories: builder.query({ query: () => '/categories' }),
            createCategory: builder.mutation({
                  query: (newCategory) => ({
                        url: '/categories',
                        method: 'POST',
                        body: newCategory
                  })
            }),
            getSubCategories: builder.query({ query: () => '/subcategories' }),
            createSubCategory: builder.mutation({
                  query: (newSubCategory) => ({
                        url: '/subcategories',
                        method: 'POST',
                        body: newSubCategory
                  })
            }),
            createProduct: builder.mutation({
                  query: (newProduct) => ({
                        url: '/products',
                        method: 'POST',
                        body: newProduct
                  })
            })
      })
})

export const { useGetProductsQuery, useCreateProductMutation, useGetCategoriesQuery, useGetSubCategoriesQuery ,useCreateCategoryMutation,useCreateSubCategoryMutation} = productApi