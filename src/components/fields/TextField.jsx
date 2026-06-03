/*
    TextField Compoenent to create and handle Textbox type form elements.
*/

import React from "react";

// import { usePdfContext } from '../../contexts/pdfContext'
import useFieldSelection from "../../hooks/useFieldSelection";

const TextField = ({ field, register, errors }) => {
  // const {dispatch} = usePdfContext();
  // console.log("From Text",field);
  const handleFocus = useFieldSelection(field);
  return (
    <div>
      <label htmlFor={field.id} className="block mb-2 mt-4 font-medium">
        {field.label}
      </label>
      <input
        type="text"
        id={field.id}
        {...register(field.id)}
        className="w-full border rounded-lg p-3"
        onFocus={handleFocus}
      />
      {errors[field.id] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.id].message}</p>
      )}
    </div>
  );
};

export default TextField;
