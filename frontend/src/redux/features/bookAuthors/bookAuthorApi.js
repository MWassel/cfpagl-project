import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/book_authors`,
  credentials: "include",
});

const bookAuthorApi = createApi({
  reducerPath: "bookAuthorApi",
  baseQuery: baseQuery,
  tagTypes: ["bookAuthors"],
  endpoints: (builder) => ({
    addBookAuthor: builder.mutation({
      query: (newBookAuthor) => ({
        url: "/create-book-authors",
        method: "POST",
        body: newBookAuthor,
        formData: true,
      }),
      invalidatesTags: ["bookAuthors"],
    }),
  }),
});

export default bookAuthorApi;
export const { useAddBookAuthorMutation } = bookAuthorApi;
