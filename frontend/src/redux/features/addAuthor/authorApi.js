import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/author`,
  credentials: "include",
});

const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: baseQuery,
  tagTypes: ["author"],
  endpoints: (builder) => ({
    addAuthor: builder.mutation({
      query: (author) => ({
        url: "/create-author",
        method: "POST",
        body: author,
      }),
      invalidatesTags: ["author"],
    }),
  }),
});

export const { useAddAuthorMutation } = authorApi;

export default authorApi;
