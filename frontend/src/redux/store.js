import { configureStore } from "@reduxjs/toolkit";
import specialitiesApi from "./features/specialities/specialitiesApi";
import authApi from "./features/auth/authApi";
import booksApi from "./features/books/booksApi";
import branchApi from "./features/branch/branchApi";

export const store = configureStore({
  reducer: {
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(specialitiesApi.middleware)
      .concat(authApi.middleware)
      .concat(booksApi.middleware)
      .concat(branchApi.middleware),
});
