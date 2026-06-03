//Slice for PDF Store, contains the reducer method and actions for state updates.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formSchema: null,
  selectedField: null,
  submittedData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormSchema(state, action) {
      state.formSchema = action.payload;
    },
    setSelectedField(state, action) {
      state.selectedField = action.payload;
    },
    setSubmittedData(state, action) {
      state.submittedData = action.payload;
    },
    clearForm(state) {
      state.formSchema = null;
      state.selectedField = null;
    },
  },
});

export const { setFormSchema, setSelectedField, setSubmittedData, clearForm } =
  formSlice.actions;

export default formSlice.reducer;
