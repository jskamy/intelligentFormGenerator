//This utility is to flatten the pdf eatracted data at field level

export default function flattenFields(sections){
    return sections.flatMap(section => section.fields)
}
