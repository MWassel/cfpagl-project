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
    }),
    logoutManager: builder.query({
      query: () => "/logout-manager",
    }),
    validate: builder.query({
      query: () => "/validate",
      transformResponse: (response) => {
        return { isAuthenticated: response?.valid || false };
      },
    }),
  }),
});

export const {
  useLoginManagerMutation,
  useLogoutManagerQuery,
  useValidateQuery,
} = authApi;

export default authApi;
