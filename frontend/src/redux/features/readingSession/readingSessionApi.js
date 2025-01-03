import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/readers`,
  credentials: "include",
});

const readingSessionApi = createApi({
  reducerPath: "readingSessionApi",
  baseQuery: baseQuery,
  tagTypes: ["readingSession"],
  endpoints: (builder) => ({
    createReadingSession: builder.mutation({
      query: (data) => ({
        url: "/create-reader",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["readingSession"],
    }),
    getReadingSession: builder.query({
      query: () => "/",
      providesTags: ["readingSession"],
    }),
    updateReadingSession: builder.mutation({
      query: ({ id }) => ({
        url: `/patch-reader/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["readingSession"],
    }),
  }),
});

export default readingSessionApi;

export const {
  useGetReadingSessionQuery,
  useUpdateReadingSessionMutation,
  useCreateReadingSessionMutation,
} = readingSessionApi;
