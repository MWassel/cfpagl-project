import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/student`,
  credentials: "include",
});

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: baseQuery,
  tagTypes: ["student"],
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (newstudent) => ({
        url: "/create-student",
        method: "POST",
        body: newstudent,
        formData: true,
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export default studentApi;

export const { useAddStudentMutation } = studentApi;
