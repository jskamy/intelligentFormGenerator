/*
    Created a store to manage the PDF and Form Data using Redux Toolkit
*/
import { configureStore } from "@reduxjs/toolkit";

import pdfReducer from "../features/pdf/pdfSlice";
import formReducer from "../features/form/formSlice";

export const store = configureStore({
  reducer: {
    pdf: pdfReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["pdf.file"],
        ignoredActions: ["pdf/setFile"],
      },
    }),
});
