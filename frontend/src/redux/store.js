import { configureStore } from "@reduxjs/toolkit";
import specialitiesApi from "./features/specialities/specialitiesApi";
import authApi from "./features/auth/authApi";
import booksApi from "./features/books/booksApi";

export const store = configureStore({
  reducer: {
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(specialitiesApi.middleware)
      .concat(authApi.middleware)
      .concat(booksApi.middleware),
});
