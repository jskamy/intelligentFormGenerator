//This file is used to flatten the incoming param into a single level array - fields only

export default function flattenFields(sections){
    return sections.flatMap(section => section.fields)
}