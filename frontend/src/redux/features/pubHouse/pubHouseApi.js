import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/publishing`,
  credentials: "include",
});

const pubHouseApi = createApi({
  reducerPath: "pubHouseApi",
  baseQuery: baseQuery,
  tagTypes: ["pubHouse"],
  endpoints: (builder) => ({
    addPubHouses: builder.mutation({
      query: (newPubHouse) => ({
        url: "/create-publishing_house",
        method: "POST",
        body: newPubHouse,
        formData: true,
      }),
      invalidatesTags: ["pubHouse"],
    }),
  }),
});

export const { useAddPubHousesMutation } = pubHouseApi;
export default pubHouseApi;
