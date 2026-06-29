//The comment should explain the util script
export default function flattenFields(sections){
    return sections.flatMap(section => section.fields)
}