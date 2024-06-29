import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product, ProductsResponse } from "src/Type/Types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `products/categories`,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    updateProduct: builder.mutation<
      Product,
      { id: number; product: Partial<Product> }
    >({
      query: ({ id, product }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
} = api;
