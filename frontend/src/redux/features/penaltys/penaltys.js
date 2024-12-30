import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/penalty_record`,
  credentials: "include",
});

const penaltysApi = createApi({
  reducerPath: "penaltysApi",
  baseQuery: baseQuery,
  tagTypes: ["penaltys"],
  endpoints: (builder) => ({
    addPenalty: builder.mutation({
      query: (data) => ({
        url: "/create-pemalty_record",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["penaltys"],
    }),
  }),
});

export const { useAddPenaltyMutation } = penaltysApi;

export default penaltysApi;
