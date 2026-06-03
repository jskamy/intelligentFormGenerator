//PDF Slice to manage the PDF state store

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  pdfTextBlocks: [],
  pageDimensions: [],
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
    },
    setPdfTextBlocks(state, action) {
      state.pdfTextBlocks = action.payload;
    },
    setPageDimensions(state, action) {
      state.pageDimensions = action.payload;
    },
    clearPdf(state) {
      state.file = null;
      state.pdfTextBlocks = [];
      state.pageDimensions = [];
    },
  },
});

export const { setFile, setPdfTextBlocks, setPageDimensions, clearPdf } =
  pdfSlice.actions;

export default pdfSlice.reducer;
