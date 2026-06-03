/*
    This component uses Field Registry and render the necessary form elements by routing to the respective component type.
*/

import React from 'react'
import FIELD_REGISTRY from '../constants/FieldRegistry'

const FieldRenderer = ({field,register,errors}) => {
    const Component=FIELD_REGISTRY[field.type];

    if(!Component){
        return(
            <div> Unsupport Field Type: {" "} {field.type}</div>
        )
    }

    return <Component field={field} register={register} errors={errors} />
}

export default FieldRenderer