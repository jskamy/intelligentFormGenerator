//Registry to maintain the constants for all the form field types supported by the form engine.

import TextField from "../components/fields/TextField";
import NumberField from "../components/fields/NumberField";
import RadioField from "../components/fields/RadioField";
import SelectField from "../components/fields/SelectField";
import CheckboxField from "../components/fields/CheckboxField";
import DateField from "../components/fields/DateField";
import TextAreaField from "../components/fields/TextAreaField";

const FIELD_REGISTRY = {
  text: TextField,
  number: NumberField,
  radio: RadioField,
  select: SelectField,
  checkbox: CheckboxField,
  date: DateField,
  textarea: TextAreaField,
};

export default FIELD_REGISTRY;
