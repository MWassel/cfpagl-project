import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/branch`,
  credentials: "include",
});

const branchApi = createApi({
  reducerPath: "branchApi",
  baseQuery: baseQuery,
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    addBranch: builder.mutation({
      query: (newBranch) => ({
        url: "/create-branch",
        method: "POST",
        body: newBranch,
        formData: true,
      }),
      invalidatesTags: ["Branches"],
    }),
  }),
});

export default branchApi;

export const { useAddBranchMutation } = branchApi;
