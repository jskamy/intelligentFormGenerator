/*
    Select Compoenent to create and handle Selection box type form elements.
*/

import React from "react";
// import { usePdfContext } from '../../contexts/pdfContext'
import useFieldSelection from "../../hooks/useFieldSelection";

const SelectField = ({ field, register, errors }) => {
  // const {dispatch}=usePdfContext();
  const handleFocus = useFieldSelection(field);
  return (
    <div>
      <label htmlFor={field.id} className="block mb-2 font-medium">
        {field.label}
      </label>
      <select
        id={field.id}
        {...register(field.id)}
        className="w-full border rounded-lg p-3"
        onFocus={handleFocus}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={field.id + option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors[field.id] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.id].message}</p>
      )}
    </div>
  );
};

export default SelectField;
