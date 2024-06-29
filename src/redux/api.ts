import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  rating: number;
  thumbnail: string;
  reviews: Review[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

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
