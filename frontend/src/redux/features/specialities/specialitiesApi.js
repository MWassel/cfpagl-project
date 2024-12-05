import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/specialities`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const specialitiesApi = createApi({
  reducerPath: "specialitiesApi",
  baseQuery: baseQuery,
  tagTypes: ["Specialities"],
  endpoints: (builder) => ({
    fetchSpecialities: builder.query({
      query: () => "/",
      providesTags: ["Specialities"],
    }),
    addSpeciality: builder.mutation({
      query: (newSpeciality) => ({
        url: "/create-speciality",
        method: "POST",
        body: newSpeciality,
      }),
      invalidatesTags: ["Specialities"],
    }),
    updateSpeciality: builder.mutation({
      query: (id, updatedSpeciality) => ({
        url: `/patch-speciality/${id}`,
        method: "PATCH",
        body: updatedSpeciality,
      }),
      invalidatesTags: ["Specialities"],
    }),
  }),
});

export const {
  useFetchSpecialitiesQuery,
  useAddSpecialityMutation,
  useUpdateSpecialityMutation,
} = specialitiesApi;

export default specialitiesApi;
