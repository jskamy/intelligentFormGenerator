//This utility is flattening the extracted form data
export default function flattenFields(sections){
    return sections.flatMap(section => section.fields)
}
