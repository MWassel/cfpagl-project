import { configureStore } from "@reduxjs/toolkit";
import specialitiesApi from "./features/specialities/specialitiesApi";
import authApi from "./features/auth/authApi";
import booksApi from "./features/books/booksApi";
import branchApi from "./features/branch/branchApi";
import studentApi from "./features/student/studentApi";
import autherApi from "./features/addAuthor/authorApi";
import categoryApi from "./features/category/categoryApi";
import pubHouseApi from "./features/pubHouse/pubHouseApi";
import punishmentApi from "./features/punishment/punishmentApi";
import bookCopyApi from "./features/bookCopy/bookCopyApi";
import bookAuthorApi from "./features/bookAuthors/bookAuthorApi";
import indexApi from "./features/index/indexApi";

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
    [punishmentApi.reducerPath]: punishmentApi.reducer,
    [bookCopyApi.reducerPath]: bookCopyApi.reducer,
    [bookAuthorApi.reducerPath]: bookAuthorApi.reducer,
    [indexApi.reducerPath]: indexApi.reducer,
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
      .concat(pubHouseApi.middleware)
      .concat(punishmentApi.middleware)
      .concat(bookCopyApi.middleware)
      .concat(bookAuthorApi.middleware)
      .concat(indexApi.middleware),
});
