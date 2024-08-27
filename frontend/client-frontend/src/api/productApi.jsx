import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
      reducerPath: 'productApi',
      baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_API_URL,
      }),
      endpoints: (builder) => ({
            getProducts: builder.query({
                  query: () => '/products'
            }),
            getCategories: builder.query({ query: () => '/categories' }),
            getSubCategories: builder.query({
                  query: () => '/subcategories'
            }),
            getProductsByCategory: builder.query({ query: (id) => ({ url: `/categories/${id}`, method: 'GET', }) })


      })
})

export const { useGetProductsQuery, useGetSubCategoriesQuery, useGetProductsByCategoryQuery, useGetCategoriesQuery } = productApi