import { configureStore } from "@reduxjs/toolkit";
import specialitiesApi from "./features/specialities/specialitiesApi";
import authApi from "./features/auth/authApi";
import booksApi from "./features/books/booksApi";
import branchApi from "./features/branch/branchApi";
import studentApi from "./features/student/studentApi";
import autherApi from "./features/addAuthor/authorApi";
import categoryApi from "./features/category/categoryApi";
import pubHouseApi from "./features/pubHouse/pubHouseApi";

export const store = configureStore({
  reducer: {
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [autherApi.reducerPath]: autherApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [pubHouseApi.reducerPath]: pubHouseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(specialitiesApi.middleware)
      .concat(authApi.middleware)
      .concat(booksApi.middleware)
      .concat(branchApi.middleware)
      .concat(studentApi.middleware)
      .concat(autherApi.middleware)
      .concat(categoryApi.middleware)
      .concat(pubHouseApi.middleware),
});
