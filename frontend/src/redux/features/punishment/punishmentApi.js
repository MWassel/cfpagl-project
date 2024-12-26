import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/punishment`,
  credentials: "include",
});

const punishmentApi = createApi({
  reducerPath: "punishmentApi",
  baseQuery: baseQuery,
  tagTypes: ["punishment"],
  endpoints: (builder) => ({
    addPunishment: builder.mutation({
      query: (data) => ({
        url: "/create-punishment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["punishment"],
    }),
  }),
});

export const { useAddPunishmentMutation } = punishmentApi;

export default punishmentApi;
