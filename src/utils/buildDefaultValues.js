//Utility will set default values for all the field type, if any field type in future requires any default value that can be added here based on the form schema

export default function buildDefaultValues(fields) {
  const defaults = {};

  fields.forEach((element) => {
    switch (element.type) {
      case "checkbox":
        if (element.options?.length) {
          defaults[element.id] = [];
        } else {
          defaults[element.id] = false;
        }
        break;
      case "number":
        defaults[element.id] = undefined;
      default:
        defaults[element.id] = "";
    }
  });

  return defaults;
}
