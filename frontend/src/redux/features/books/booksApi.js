import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
        formData: true,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/patch-book/${id}`,
        method: "PATCH",
        body: updatedBook,
        formData: true,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Books"],
    }),
    fetchSingleBook: builder.query({
      query: (id) => `/get-book/${id}`,
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchSingleBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;
