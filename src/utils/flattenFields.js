export default function flattenFields(sections){
    return sections.flatMap(section => section.fields)
}