import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/loans`,
  credentials: "include",
});

const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: baseQuery,
  tagTypes: ["loans"],
  endpoints: (builder) => ({
    getLoans: builder.query({
      query: () => "/",
      providesTags: ["loans"],
    }),
    addLoan: builder.mutation({
      query: (data) => ({
        url: "/create-loan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loans"],
    }),
    updateLoan: builder.mutation({
      query: ({ id }) => ({
        url: `/patch-loan/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["loans"],
    }),
  }),
});

export const { useGetLoansQuery, useAddLoanMutation, useUpdateLoanMutation } =
  loanApi;

export default loanApi;
