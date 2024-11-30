import { configureStore } from "@reduxjs/toolkit";
import specialitiesApi from "./features/specialities/specialitiesApi";
import authApi from "./features/auth/authApi";

export const store = configureStore({
  reducer: {
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(specialitiesApi.middleware)
      .concat(authApi.middleware),
});
