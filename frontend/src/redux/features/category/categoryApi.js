import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/categories`,
  credentials: "include",
});

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["category"],
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create-categorie",
        method: "POST",
        body: newCategory,
        formData: true,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export default categoryApi;

export const { useAddCategoryMutation } = categoryApi;
