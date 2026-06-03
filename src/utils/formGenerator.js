//Generate the Form Config data required for the Form Creation

import buildZodSchema from "./buildZodSchema";
import buildDefaultValues from "./buildDefaultValues";
import getVisibleFields from "./getVisibleFields";
import getVisibleSections from "./getVisibleSections";
import flattenFields from "./flattenFields";

export default function formGenerator(schema, values={}){

    // console.log(schema.sections);
    const fields=flattenFields(schema.sections);
    // console.log(fields);

    return ({
        title:schema.title,
        sections:getVisibleSections(schema.sections,values),
        validationSchema:buildZodSchema(fields),
        defaultValues:buildDefaultValues(fields),
        visibleFields:getVisibleFields(fields,values)
    })
}