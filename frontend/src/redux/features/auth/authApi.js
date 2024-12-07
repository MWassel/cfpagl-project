import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/auth`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    loginManager: builder.mutation({
      query: (credentials) => ({
        url: "/login-manager",
        method: "POST",
        body: credentials,
      }),
      // Add invalidation and potentially transform response
      invalidatesTags: ["Auth"],
      transformResponse: (response) => {
        console.log("Login mutation response:", response);
        return {
          success: true,
          user: response.user || null,
          // Add token if needed
        };
      },
      transformErrorResponse: (response) => {
        console.log("Login mutation error:", response);
        return {
          success: false,
          error: response.error || "Login failed",
        };
      },
    }),
    logoutManager: builder.mutation({
      // Change to mutation for better practice
      query: () => ({
        url: "/logout-manager",
        method: "POST",
      }),
      // Clear token on logout
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem("jwt");
          // Optional: dispatch an action to reset auth state
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
      invalidatesTags: ["Auth"],
    }),
    validate: builder.query({
      query: () => "/validate",
      transformResponse: (response) => ({
        valid: response?.valid || false,
        user: response?.user || null,
      }),
      // Add caching and invalidation
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginManagerMutation,
  useLogoutManagerMutation, // Changed from Query to Mutation
  useValidateQuery,
} = authApi;

export default authApi;
