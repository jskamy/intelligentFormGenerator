//Set Zod Validator for all the form fields based on the from schema

import {z} from "zod";

export default function buildZodSchema(fields){
    const schemaObject=[];

    fields.forEach(element => {
        let validator;

        switch(element.type){
            case "text":
            case "textarea":{
                validator=z.string();

                if(element.required){
                    validator=validator.min(1,`${element.label} is required`);
                }else{
                    validator=validator.optional();
                }

                if(element.minLength){
                    validator=validator.min(element.minLength,`${element.label} must be atleast ${element.minLength} characters`);
                }

                if(element.maxLength){
                    validator=validator.max(element.maxLength,`${element.label} must not exceed ${element.maxLength} characters`);
                }

                if(element.pattern){
                    validator=validator.regex(new RegExp(element.pattern),`${element.label} is invalid`);
                }
                break;
            }
            case "email":{
                validator=z.email("Invalid email Address");

                if(!element.required){
                    validator=validator.optional();
                }
                break;
            }
            case "number":{
                validator=z.number({
                    invalid_type_error:`${element.label} must be anumber`
                });

                if(element.min !== undefined){
                    validator=validator.min(element.min)
                }

                if(element.max !== undefined){
                    validator=validator.max(element.max);
                }
                break;
            }
            case "date":{
                validator=z.string();

                if(element.required){
                    validator=validator.min(1,`${element.label} is required`);
                }else{
                    validator=validator.optional();
                }
                break;
            }
            case "radio":
            case "select":{
                if(element.options?.length){
                    validator=z.enum(element.options);
                    if(!element.required){
                        validator=validator.optional();
                    }
                }else{
                    validator=z.string();
                }
                break;
            }
            case "checkbox":{
                if(element.options?.length){
                    validator=z.array(
                        z.string()
                    );

                    if(element.required){
                        validator=validator.min(1,`${element.label} is required`);
                    }
                }else{
                    validator=z.boolean();
                    if(element.required){
                        validator=validator.refine(
                            value => value === true,{
                                message: `${fields.label} is required`
                            }
                        ) 
                    }
                }
                break;
            }
            default:{
                validator=z.any();
            }
        }

        schemaObject[element.id]=validator;
    });

    return z.object(schemaObject);
}