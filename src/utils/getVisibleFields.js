//Manage the dynamic fields in forms, this utility will use watch and update the dynamic fields.

export default function getVisibleFields(fields,values){

    return fields.filter((field)=>{
        if(!field.dependent){
            return true;
        }

        const{
            field:dependentField,
            equals
        } = field.dependent;
        // console.log(values[dependentField],equals);
        return values[dependentField] === equals;
    });
}