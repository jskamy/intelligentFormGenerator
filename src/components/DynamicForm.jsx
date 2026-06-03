/*
  This component loads the Form Schema from LLM and render and manage the Form.
*/

import React, { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { optional, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
// import sampleFormSchema from '../schemas/sampleFormSchema'
import { setSubmittedData } from "../features/form/formSlice";
import FieldRenderer from "./FieldRenderer";

import buildZodSchema from "../utils/buildZodSchema";
import formGenerator from "../utils/formGenerator";


// import { usePdfContext } from "../contexts/pdfContext";

const DynamicForm = () => {
  //   const { state, dispatch } = usePdfContext();
  //   const { formSchema: sampleFormSchema } = state;
  const sampleFormSchema = useSelector((state) => state.form.formSchema);
  // console.log(sampleFormSchema);
  const [submissionState, setSubmissionState] = useState("not-submitted");
  const dispatch = useDispatch();
  const initialConfig = useMemo(() => {
    if (!sampleFormSchema) {
      return null;
    }
    return formGenerator(sampleFormSchema);
  }, [sampleFormSchema]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: initialConfig
      ? zodResolver(initialConfig?.validationSchema)
      : undefined,
    defaultValues: initialConfig ? initialConfig?.defaultValues : {},
  });

  const values = watch();

  const formConfig = useMemo(() => {
    if (!sampleFormSchema) {
      return null;
    }
    return formGenerator(sampleFormSchema, values);
  }, [sampleFormSchema, values]);

  if (!sampleFormSchema || !formConfig) {
    return (
      <p className="flex items-center justify-center h-full text-gray-500 bg-white">
        After PDF is uploaded, Generate Form to preview the form
      </p>
    );
  }

  function onSubmit(data) {
    setSubmissionState("submitted");
    dispatch(setSubmittedData(data));
    console.log(data);
  }

  function onError(errors) {
    setSubmissionState("failed");
    console.log("SUBMIT FAILED");
    console.log(errors);
  }

  return (
    <div className="max-w-2xl h-full overflow-y-auto mx-auto p-4">
      <form
        action=""
        className="space-y-6 shadow-lg rounded-xl p-6"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h1 className="text-2xl font-bold text-center">{formConfig.title}</h1>

        {/* {
            formConfig.visibleFields.map(
                (field)=>(
                    <FieldRenderer key={field.id} field={field} register={register} errors={errors} />
                )
            )
           } */}
        {formConfig.sections.map((section) => (
          <div key={section.title} className="border rounded-xl p-6 mb-6">
            <h2 className="text-xl text-center font-semibold mb-4">
              {section.title}
            </h2>

            {section.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                register={register}
                errors={errors}
              />
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounder-lg"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-center">
        {submissionState === "submitted" && (
          <p className="text-green-700 front-medium">
            Form submitted succesfully
          </p>
        )}
        {submissionState === "failed" && (
          <p className="text-red-700 front-medium">Form submission failed.</p>
        )}
        {submissionState === "not-submitted" && (
          <p className="text-gray-700 front-medium">
            Fill all the fields and submit the form
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
