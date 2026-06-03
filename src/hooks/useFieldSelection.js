//Used by all the Form element components to dispatch the field to selectedField state onfocus event.

import { useDispatch } from "react-redux";
import { setSelectedField } from "../features/form/formSlice";

export default function useFieldSelection(field) {
  const dispatch = useDispatch();

  const handleFocus = () => {
    // console.log(field);
    dispatch(setSelectedField(field));
  };

  return handleFocus;
}
