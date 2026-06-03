//Design the prompt with the input pdf extracted text

export default function formSchemaPrompt(groupedRows){
    return `
    Role - You are an expert in Banking Application Forms.
    Context - Need to extract a Form Schema from a text extracted from PDF to be used by a Form Engine to generate digital forms.
    Goal - Analyze the extracted form rows from a application pdf and generate a structured json form schema.
    Rules:
        - Identify Sections. If there is no sections, wrap the entire form as one section with the title as section title.
        - Schema must have atleast one section. If any part of the form is left out with no sections, define a section and wrap it out.
        - Identify Fields.
        - Infer Field type. Field types should be any one of the type - text | number | textarea | date | select | radio | checkbox. Ignore other fields.
        - Infer validations for fields wherever it is obvious.
        - Split multiple fields that appear on the same row.
        - For field types like select, radio, checkbox, add all the options provided as an array under options key.
        - For select, radio, checkbox, in options array, if not even one option is avaialble, make it optional and always keep the type to checkbox.
        - If only options are listed, see if they are assiociated with the previous field label mentioned in the earlier line.
        - Consider Please tick as checkbox type and wrap all the options listed in the line or next line before the next field starts. If no option is available, leave it and set it as not requrired.
        - Exclude items like For Office Use, Declarations, Terms & Agreement, File upload type fields and include all other types of fields.
        - If a field is dependent on the response of the previous field, use the dependent key to add necessary information and display the nested field items with respect to their type.
        - Add the depending sub field with all information as one item in the fields array so that it can be rendered and processed.
        - Map the XY corordinates against each field.
        - Return only valid JSON that can be parsed using json.parse
        - Output text should only contain json data that can be parsed and no additional information or markups.
    Output JSON format:
    {
        "title":"",
        "sections":[
                    {
                        "title":"",
                        "fields":[
                                {
                                    "id":"",
                                    "label":"",
                                    "type":"text | number | textarea | date | select | radio | checkbox",
                                    "required":"",
                                    "validations":{},
                                    "dependent":{
                                        "field":"",
                                        "equals":"",  
                                    },
                                     "coordinates": {
                                     "x": "",
                                     "y": "",
                                     "width":"",
                                     "height":"",
                                     "page":"",
                                    },
                                    "options":[]
                                } 
                        ]
                    }            
                ]
    }
    
    Input rows:
        ${
            JSON.stringify(groupedRows,null,2)
        }
    `;
}