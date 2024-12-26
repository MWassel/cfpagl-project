import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/book_copys`,
  credentials: "include",
});

const bookCopyApi = createApi({
  reducerPath: "bookCopyApi",
  baseQuery: baseQuery,
  tagTypes: ["bookCopys"],
  endpoints: (builder) => ({
    addBookCopy: builder.mutation({
      query: (newBookCopy) => ({
        url: "/create-book-copy",
        method: "POST",
        body: newBookCopy,
        formData: true,
      }),
      invalidatesTags: ["bookCopys"],
    }),
  }),
});

export default bookCopyApi;

export const { useAddBookCopyMutation } = bookCopyApi;
