//Uses getVisibleFields to handle Dynamic fields in all the sections involved in the form.

import getVisibleFields from "./getVisibleFields"

export default function getVisibleSections(sections,values){
    return sections.map((section)=>({
        ...section,fields:getVisibleFields(section.fields,values)
}))
}