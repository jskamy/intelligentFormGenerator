/*
    TextArea Compoenent to create and handle textarea type form elements.
*/

import React from "react";
// import { usePdfContext } from '../../contexts/pdfContext'
import useFieldSelection from "../../hooks/useFieldSelection";

const TextAreaField = ({ field, register, errors }) => {
  // const {dispatch}=usePdfContext();
  const handleFocus = useFieldSelection(field);
  return (
    <div>
      <label htmlFor={field.id} className="block mb-2 font-medium">
        {field.label}
      </label>
      <textarea
        id={field.id}
        rows={4}
        {...register(field.id)}
        className="w-full border rounded-lg p-3"
        onFocus={handleFocus}
      ></textarea>
      {errors[field.id] && (
        <p className="text-red-100 text-sm mt-1">{errors[field.id].message}</p>
      )}
    </div>
  );
};

export default TextAreaField;
