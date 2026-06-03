/*
    RadioField Compoenent to create and handle Radio type form elements.
*/

import React from "react";
// import { usePdfContext } from '../../contexts/pdfContext'
import useFieldSelection from "../../hooks/useFieldSelection";

const RadioField = ({ field, register, errors }) => {
  // const {dispatch}=usePdfContext();
  const handleFocus = useFieldSelection(field);
  //fields with options
  if (field.options?.length) {
    return (
      <div>
        <label className="block mt-4 mb-2 font-medium">{field.label}</label>
        <div className="flex flex-row flex-wrap sm:flex-col gap-6">
          {field.options.map((option) => (
            <label htmlFor={field.id + option} key={option}>
              <input
                id={field.id + option}
                type="radio"
                value={option}
                {...register(field.id)}
                onFocus={handleFocus}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        {errors[field.id] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[field.id].message}
          </p>
        )}
      </div>
    );
  }
  //fields with no options
  return (
    <div>
      <label className="flex items-center gap-2 mb-2 mt-4">
        <input
          id={field.id}
          type="radio"
          value={field.id}
          {...register(field.id)}
          onFocus={handleFocus}
        />
        <span>{field.label}</span>
      </label>

      {errors[field.id] && (
        <p className="text-red-500 text-sm mt-1">{errors[field.id].message}</p>
      )}
    </div>
  );
};

export default RadioField;
