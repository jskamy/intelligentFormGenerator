/*
  This component provide CTA for Form Generation based on PDF data and load the form in the respective container.
*/

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setFormSchema } from "../features/form/formSlice.js";
import generateFormSchema from "../services/llmService.js";
import LoadingComponent from "./LoadingComponent.jsx";
import { addListener } from "@reduxjs/toolkit";

const FormBuilder = () => {
  // const { state, dispatch } = usePdfContext();
  // const {pdfTextBlocks:groupedRows}=state;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const groupedRows = useSelector((state) => state.pdf.pdfTextBlocks);

  async function handleFormGeneration() {
    try {
      if (groupedRows.length === 0) {
        alert("No PDF document is processed");
        throw new Error("No PDF Data is available");
      }
      setIsLoading(true);
      const fSchema = await generateFormSchema(groupedRows);
      // console.log(fSchema);
      dispatch(setFormSchema(fSchema));
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleFormGeneration}
        className="py-3 px-5 rounded-lg bg-gray-600
                text-white font-medium hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Generate Form
      </button>
      {isLoading && <LoadingComponent message="Form Generation in progress" />}
    </div>
  );
};

export default FormBuilder;
