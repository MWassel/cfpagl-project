import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/book_index`,
  credentials: "include",
});

const indexApi = createApi({
  reducerPath: "indexApi",
  baseQuery: baseQuery,
  tagTypes: ["index"],
  endpoints: (builder) => ({
    addIndex: builder.mutation({
      query: (data) => ({
        url: "/create-index",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["index"],
    }),
  }),
});

export default indexApi;

export const { useAddIndexMutation } = indexApi;
