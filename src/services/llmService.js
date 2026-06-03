//Util to perform the LLM call to get the form schema based on the pdf extracted data

import formSchemaPrompt from "./prompts/formSchemaPrompt";

export default async function generateFormSchema(groupedRows){
    const prompt=formSchemaPrompt(groupedRows);

    // console.log(`prompt is ${prompt}`)

    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${import.meta.env.VITE_KEY}`
      },
      body:JSON.stringify({
        model:"gpt-4.1-mini",
        input:prompt,
        temperature:0,
        text:{
          format:{
            type:"json_object"
          }
        }
      })
    });

    const data=await response.json();
    // console.log(data);
    // return data.output[0].content[0].text;
    return cleanJson(data.output[0].content[0].text)
    

//     const data={
//     "title": "KYC UPDATION FORM INDIVIDUAL",
//     "sections": [
//         {
//             "title": "General Information",
//             "fields": [
//                 {
//                     "id": "Date",
//                     "label": "Date",
//                     "type": "date",
//                     "required": false,
//                     "validations": {
//                         "format": "DDMMYYYY"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 436.54,
//                         "y": 736.08,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "BranchName",
//                     "label": "Branch Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 708,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "BranchCode",
//                     "label": "Branch Code",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 295.73,
//                         "y": 708.6,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CustomerID",
//                     "label": "Customer ID",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 666.48,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "AccountNo",
//                     "label": "Account No.",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 644.74,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CKYCNo",
//                     "label": "CKYC No.",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 343.39,
//                         "y": 644.74,
//                         "page": 1
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "1 Personal Details",
//             "fields": [
//                 {
//                     "id": "ExistingCustomerID",
//                     "label": "Existing Customer ID (If applicable)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 596.26,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameFirstName",
//                     "label": "Name* First Name",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 578.02,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameMiddleName",
//                     "label": "Name* Middle Name",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 150,
//                         "y": 578.02,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameLastName",
//                     "label": "Name* Last Name",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 315,
//                         "y": 578.02,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PrefixName",
//                     "label": "Prefix (Same as ID Proof)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 87.96,
//                         "y": 563.14,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MaidenNameFirstName",
//                     "label": "Maiden Name First Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 549.94,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MaidenNameMiddleName",
//                     "label": "Maiden Name Middle Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 150,
//                         "y": 549.94,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MaidenNameLastName",
//                     "label": "Maiden Name Last Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 315,
//                         "y": 549.94,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "DateOfBirth",
//                     "label": "Date of Birth*",
//                     "type": "date",
//                     "required": true,
//                     "validations": {
//                         "format": "DDMMYYYY"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 531.34,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Gender",
//                     "label": "Gender*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Male",
//                         "Female",
//                         "Transgender"
//                     ],
//                     "coordinates": {
//                         "x": 188.06,
//                         "y": 531.58,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MaritalStatus",
//                     "label": "Marital Status*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Married",
//                         "Unmarried",
//                         "Others"
//                     ],
//                     "coordinates": {
//                         "x": 366.79,
//                         "y": 531.58,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PrefixFatherMother",
//                     "label": "Prefix - Name of Father/Mother",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 87.96,
//                         "y": 516.07,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameFatherMotherFirstName",
//                     "label": "Name of Father/Mother First Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 502.87,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameFatherMotherMiddleName",
//                     "label": "Name of Father/Mother Middle Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 150,
//                         "y": 502.87,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameFatherMotherLastName",
//                     "label": "Name of Father/Mother Last Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 315,
//                         "y": 502.87,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Spouse",
//                     "label": "Spouse* (Please Tick One)",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 485.35,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NoOfDependents",
//                     "label": "No. of Dependents",
//                     "type": "number",
//                     "required": false,
//                     "validations": {
//                         "min": 0
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 470.47,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Illiterate",
//                     "label": "Illiterate",
//                     "type": "radio",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "YES",
//                         "NO"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 458.83,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "IdentificationMarksIfIlliterate",
//                     "label": "Identification Marks (if yes to Illiterate)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "Illiterate",
//                         "equals": "YES"
//                     },
//                     "coordinates": {
//                         "x": 211.82,
//                         "y": 456.43,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PrefixGuardian",
//                     "label": "Prefix - Name of Guardian",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 87.96,
//                         "y": 443.23,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameGuardianFirstName",
//                     "label": "Name of Guardian First Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 429.19,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameGuardianMiddleName",
//                     "label": "Name of Guardian Middle Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 150,
//                         "y": 429.19,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NameGuardianLastName",
//                     "label": "Name of Guardian Last Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 315,
//                         "y": 429.19,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MinorRelationshipWithGuardian",
//                     "label": "Relationship with Guardian (In case of Minor*)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 138.86,
//                         "y": 414.31,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Nationality",
//                     "label": "Nationality*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "In-Indian",
//                         "Others"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 387.07,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CountryNameIfOthers",
//                     "label": "Country Name (if Nationality is Others)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "Nationality",
//                         "equals": "Others"
//                     },
//                     "coordinates": {
//                         "x": 211.7,
//                         "y": 388.63,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "OccupationType",
//                     "label": "Occupation Type*",
//                     "type": "checkbox",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "S-Service",
//                         "Private Sector",
//                         "Public Sector",
//                         "Government Sector",
//                         "O-Others",
//                         "Professional",
//                         "Self employed",
//                         "Retired",
//                         "House Wife",
//                         "Student",
//                         "B-Business",
//                         "X-Not categorised"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 366.77,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "OccupationTypeSpecifyIfNotCategorised",
//                     "label": "Please specify if Not categorised (X)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "OccupationType",
//                         "equals": "X-Not categorised"
//                     },
//                     "coordinates": {
//                         "x": 180.23936,
//                         "y": 330.29,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "MonthlyIncome",
//                     "label": "Monthly Income* (Rs.)",
//                     "type": "number",
//                     "required": true,
//                     "validations": {
//                         "min": 0
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 307.97,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NetWorthApproxValue",
//                     "label": "Net Worth (approx value) Rs.",
//                     "type": "number",
//                     "required": false,
//                     "validations": {
//                         "min": 0
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 258.77,
//                         "y": 309.53,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "SourceOfIncome",
//                     "label": "Source of Income (Please tick all applicable)",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Salary",
//                         "Business Income",
//                         "Agriculture",
//                         "Investment Income",
//                         "Pension",
//                         "Others"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 288.41,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Religion",
//                     "label": "Religion",
//                     "type": "radio",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Hindu",
//                         "Muslim",
//                         "Christian",
//                         "Sikh",
//                         "Others"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 266.57,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "ReligionOthersText",
//                     "label": "Religion Others (specify)",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "Religion",
//                         "equals": "Others"
//                     },
//                     "coordinates": {
//                         "x": 376.15,
//                         "y": 269.09,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Category",
//                     "label": "Category",
//                     "type": "radio",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "General",
//                         "OBC",
//                         "SC",
//                         "ST"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 247.85,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PersonWithDisability",
//                     "label": "Person with disability",
//                     "type": "radio",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Yes",
//                         "No"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 218.9,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "VisuallyImpaired",
//                     "label": "Visually impaired (If Person with disability is Yes)",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "PersonWithDisability",
//                         "equals": "Yes"
//                     },
//                     "coordinates": {
//                         "x": 270.53,
//                         "y": 218.9,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "DifferentlyAbled",
//                     "label": "Differently abled (If Person with disability is Yes)",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": {
//                         "field": "PersonWithDisability",
//                         "equals": "Yes"
//                     },
//                     "coordinates": {
//                         "x": 387.31,
//                         "y": 218.9,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "EducationalQualification",
//                     "label": "Educational Qualification",
//                     "type": "radio",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Below SSC",
//                         "SSC",
//                         "HSC",
//                         "Graduate",
//                         "Post Graduate",
//                         "Professional",
//                         "Others"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 205.7,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "OrganizationName",
//                     "label": "Organization's Name",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 177.26,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "DesignationProfession",
//                     "label": "Designation/Profession",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 176.42,
//                         "y": 177.26,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NatureOfBusiness",
//                     "label": "Nature of Business",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 366.91,
//                         "y": 176.9,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PoliticallyExposedPerson",
//                     "label": "Politically exposed Person",
//                     "type": "checkbox",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 164.66,
//                         "y": 158.66,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "RelatedToPoliticallyExposedPerson",
//                     "label": "Related to politically Exposed Person",
//                     "type": "checkbox",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 307.37,
//                         "y": 158.66,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "NonePoliticallyRelated",
//                     "label": "None",
//                     "type": "checkbox",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 497.74,
//                         "y": 158.66,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CountryCodeOfJurisdictionOfResidence",
//                     "label": "ISO 3166 Country Code of Jurisdiction of Residence*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {
//                         "format": "ISO 3166"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 138.86,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PlaceCityOfBirth",
//                     "label": "Place/City of Birth*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 110.78,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CountryCodeOfBirth",
//                     "label": "ISO 3166 Country of Code of Birth*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {
//                         "format": "ISO 3166"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 258.77,
//                         "y": 110.78,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "Citizenship",
//                     "label": "Citizenship",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 424.9,
//                         "y": 110.78,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "CountryOfTaxResidenceInIndiaOnly",
//                     "label": "Country of Tax Residence in India only and not in any other country or territory outside India*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Yes",
//                         "No"
//                     ],
//                     "coordinates": {
//                         "x": 15,
//                         "y": 91.56,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "PAN_TIN",
//                     "label": "PAN*/Tax Identification Number or equivalent (If issued by jurisdiction)",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15,
//                         "y": 67.44,
//                         "page": 1
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "2 Contact Details (All communications will be sent on provided Mobile No./Email-ID)",
//             "fields": [
//                 {
//                     "id": "MobileNo",
//                     "label": "Mobile No.",
//                     "type": "text",
//                     "required": false,
//                     "validations": {
//                         "pattern": "^[0-9]+$",
//                         "maxLength": 15
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 20.52,
//                         "page": 1
//                     }
//                 },
//                 {
//                     "id": "EmailID",
//                     "label": "Email ID",
//                     "type": "email",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 247.01,
//                         "y": 20.52,
//                         "page": 1
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "3 Proof of Identity/Address (Please tick the appropriate Box (any one ID type) and give details)*",
//             "fields": [
//                 {
//                     "id": "ProofOfIdentityType",
//                     "label": "Proof of Identity Type*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "A-PASSPORT",
//                         "B-VOTER'S IDENTITY CARD",
//                         "C-DRIVING LICENCE",
//                         "D-UID(AADHAR)",
//                         "E-NREGA JOB CARD",
//                         "F-LETTER ISSUED BY NATIONAL POPULATION REGISTER CONTAINING DETAILS OF NAME & ADDRESS"
//                     ],
//                     "coordinates": {
//                         "x": 41.29,
//                         "y": 751.68,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "DocumentNoIdentificationNumber",
//                     "label": "Document No/Identification Number*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 711.6,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "IssueDate",
//                     "label": "Issue Date*",
//                     "type": "date",
//                     "required": true,
//                     "validations": {
//                         "format": "DDMMYYYY"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 693,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "ExpiryDate",
//                     "label": "Expiry Date (If applicable)*",
//                     "type": "date",
//                     "required": false,
//                     "validations": {
//                         "format": "DDMMYYYY"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 201.85,
//                         "y": 693,
//                         "page": 3
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "4 Address details",
//             "fields": [
//                 {
//                     "id": "AddressTypeCategory",
//                     "label": "Address type*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Residential/Business",
//                         "Residential",
//                         "Business",
//                         "Registered Office",
//                         "Unspecified"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 646.42,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "AddressLabel",
//                     "label": "Address*",
//                     "type": "textarea",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 627.82,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CityVillage",
//                     "label": "City/Village*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 587.5,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "District",
//                     "label": "District*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 259.13,
//                         "y": 587.5,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "State",
//                     "label": "State*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 19.32,
//                         "y": 569.26,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "Pin",
//                     "label": "Pin*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {
//                         "pattern": "^[0-9]+$",
//                         "maxLength": 10
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 266.93,
//                         "y": 569.26,
//                         "page": 3
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "5 Address details Correspondence",
//             "fields": [
//                 {
//                     "id": "CorrespondenceAddressCategory",
//                     "label": "Address type*",
//                     "type": "radio",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Residential/Business",
//                         "Residential",
//                         "Business",
//                         "Registered Office",
//                         "Unspecified"
//                     ],
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 530.02,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondenceAddressLabel",
//                     "label": "Address*",
//                     "type": "textarea",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 512.83,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondenceCityVillage",
//                     "label": "City/Village*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 15.12,
//                         "y": 472.27,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondenceDistrict",
//                     "label": "District*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 259.13,
//                         "y": 471.79,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondenceState",
//                     "label": "State*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 19.32,
//                         "y": 453.55,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondencePin",
//                     "label": "Pin*",
//                     "type": "text",
//                     "required": true,
//                     "validations": {
//                         "pattern": "^[0-9]+$",
//                         "maxLength": 10
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 266.93,
//                         "y": 453.55,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "CorrespondenceLocal",
//                     "label": "Local Correspondence",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 200.06,
//                         "y": 550.3,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "SameAsCurrentPermanentAddress",
//                     "label": "Same as Current/Permanent Address",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 250.97,
//                         "y": 550.3,
//                         "page": 3
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "6 Proof of Address (if OVD does not contain current address)",
//             "fields": [
//                 {
//                     "id": "ProofOfAddressDocuments",
//                     "label": "Proof of Address Documents",
//                     "type": "checkbox",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "options": [
//                         "Utility Bill",
//                         "PPO/FPPO",
//                         "Property or Municipal tax receipt",
//                         "Letter of allotment of accommodation issued by employer/ issued by State or Central Government departments, statutory or regulatory bodies, Public sector undertaking, scheduled commercial banks, financial institutions and listed companies",
//                         "Similarly, leave and license agreements with such employers allotting official accommodation"
//                     ],
//                     "coordinates": {
//                         "x": 38.64,
//                         "y": 411.31,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "DocumentNoProofOfAddress",
//                     "label": "Document No",
//                     "type": "text",
//                     "required": false,
//                     "validations": {},
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 26.76,
//                         "y": 350.93,
//                         "page": 3
//                     }
//                 },
//                 {
//                     "id": "DateProofOfAddress",
//                     "label": "Date",
//                     "type": "date",
//                     "required": false,
//                     "validations": {
//                         "format": "DDMMYYYY"
//                     },
//                     "dependent": null,
//                     "coordinates": {
//                         "x": 270.41,
//                         "y": 350.33,
//                         "page": 3
//                     }
//                 }
//             ]
//         },
//         {
//             "title": "7 Declaration Cum Undertaking Cum Self-Certification",
//             "fields": []
//         },
//         {
//             "title": "8 For Office Use/Attestation",
//             "fields": []
//         }
//     ]
// };

//    const data= {
//   "title": "ATM Card / Internet / Mobile / SMS banking service request form",
//   "sections": [
//     {
//       "title": "Applicant Details",
//       "fields": [
//         {
//           "id": "post_office",
//           "label": "Post Office",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "77.664",
//             "y": "715.66",
//             "width": "49",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "date",
//           "label": "Date (dd/mm/yyyy)",
//           "type": "date",
//           "required": false,
//           "validations": {
//             "format": "dd/mm/yyyy"
//           },
//           "dependent": null,
//           "coordinates": {
//             "x": "415.51",
//             "y": "715.66",
//             "width": "95",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "cif_id",
//           "label": "CIF ID",
//           "type": "text",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "81.504",
//             "y": "693.34",
//             "width": "29",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "primary_account",
//           "label": "Primary Account",
//           "type": "text",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "309.07",
//             "y": "699.1",
//             "width": "40",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "account_id",
//           "label": "Account ID",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "309.07",
//             "y": "687.58",
//             "width": "49",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "applicant_first_name",
//           "label": "First Name",
//           "type": "text",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "77.664",
//             "y": "637.54",
//             "width": "49",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "applicant_middle_name",
//           "label": "Middle Name",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "77.664",
//             "y": "621.1",
//             "width": "59",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "applicant_last_name",
//           "label": "Last Name",
//           "type": "text",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "77.664",
//             "y": "605.38",
//             "width": "52",
//             "height": "10",
//             "page": "1"
//           }
//         }
//       ]
//     },
//     {
//       "title": "ATM Card Requirement",
//       "fields": [
//         {
//           "id": "atm_card_required_for",
//           "label": "ATM Card required for",
//           "type": "select",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "72.024",
//             "y": "579.58",
//             "width": "250",
//             "height": "10",
//             "page": "1"
//           },
//           "options": [
//             {
//               "label": "Self",
//               "value": "self",
//               "coordinates": {
//                 "x": "97.944",
//                 "y": "551.95",
//                 "width": "40",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Joint “B” Account Holder",
//               "value": "joint_b_account_holder",
//               "coordinates": {
//                 "x": "230.21",
//                 "y": "551.95",
//                 "width": "130",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Not Needed",
//               "value": "not_needed",
//               "coordinates": {
//                 "x": "414.91",
//                 "y": "551.95",
//                 "width": "70",
//                 "height": "10",
//                 "page": "1"
//               }
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "title": "Applicant Additional Details",
//       "fields": [
//         {
//           "id": "mobile_number",
//           "label": "Mobile Number",
//           "type": "text",
//           "required": false,
//           "validations": {
//             "pattern": "^[0-9]{10}$",
//             "message": "Must be a 10 digit number"
//           },
//           "dependent": null,
//           "coordinates": {
//             "x": "77.424",
//             "y": "498.31",
//             "width": "68",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "pan_number",
//           "label": "PAN Number",
//           "type": "text",
//           "required": false,
//           "validations": {
//             "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
//             "message": "Must be a valid PAN number"
//           },
//           "dependent": null,
//           "coordinates": {
//             "x": "342.91",
//             "y": "498.31",
//             "width": "59",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "email_id",
//           "label": "Email ID",
//           "type": "text",
//           "required": false,
//           "validations": {
//             "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
//             "message": "Must be a valid email address"
//           },
//           "dependent": null,
//           "coordinates": {
//             "x": "77.424",
//             "y": "481.51",
//             "width": "38",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "date_of_birth",
//           "label": "Date of Birth",
//           "type": "date",
//           "required": false,
//           "validations": {
//             "format": "dd-mm-yyyy"
//           },
//           "dependent": null,
//           "coordinates": {
//             "x": "77.424",
//             "y": "464.71",
//             "width": "170",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "mothers_maiden_name",
//           "label": "Mother’s Maiden Name",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "342.91",
//             "y": "464.71",
//             "width": "103",
//             "height": "10",
//             "page": "1"
//           }
//         }
//       ]
//     },
//     {
//       "title": "ATM Card Request Type",
//       "fields": [
//         {
//           "id": "atm_request_type",
//           "label": "Please tick relevant requirement from below options",
//           "type": "checkbox",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "72.024",
//             "y": "438.79",
//             "width": "250",
//             "height": "10",
//             "page": "1"
//           },
//           "options": [
//             {
//               "label": "Instant ATM Card",
//               "value": "instant_atm_card",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "380.81",
//                 "width": "100",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Name to be printed on the card (Not exceeding 21 characters including space)",
//               "value": "name_on_card",
//               "type": "text",
//               "maxLength": 21,
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "339.89",
//                 "width": "350",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "New Personalized ATM card (or) Replaced Personalized ATM card New request",
//               "value": "new_or_replacement_personalized_request",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "360.65",
//                 "width": "400",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Replacement with Instant ATM card",
//               "value": "replacement_instant_atm_card",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "297.05",
//                 "width": "180",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "ATM card PIN request",
//               "value": "atm_card_pin_request",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "272.21",
//                 "width": "120",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "ATM card hot-listing / closure request (Provide last 4 digits of the card number for closure only)",
//               "value": "atm_card_hot_listing_closure",
//               "type": "text",
//               "maxLength": 4,
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "243.41",
//                 "width": "280",
//                 "height": "10",
//                 "page": "1"
//               },
//               "description": "Provide last 4 digits of the card number for closure only"
//             },
//             {
//               "label": "Internet Banking and Mobile Banking",
//               "value": "internet_and_mobile_banking",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "214.13",
//                 "width": "180",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Internet Banking",
//               "value": "internet_banking",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "191.06",
//                 "width": "70",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "SMS Banking",
//               "value": "sms_banking",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "168.5",
//                 "width": "60",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Linking of Secondary accounts existing active ATM card (Should be done once primary account card is activated)",
//               "value": "linking_secondary_accounts",
//               "type": "text",
//               "coordinates": {
//                 "x": "117.02",
//                 "y": "143.18",
//                 "width": "280",
//                 "height": "10",
//                 "page": "1"
//               }
//             },
//             {
//               "label": "Provide SB Account IDs to be linked",
//               "value": "sb_account_ids_to_be_linked",
//               "type": "text",
//               "coordinates": {
//                 "x": "383.71",
//                 "y": "149.42",
//                 "width": "160",
//                 "height": "10",
//                 "page": "1"
//               }
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "title": "Notes & Mandatory Fields",
//       "fields": [
//         {
//           "id": "note_mobile_banking",
//           "label": "Note: For availing Mobile Banking services, Internet Banking is mandatory.",
//           "type": "textarea",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "72.024",
//             "y": "111.38",
//             "width": "300",
//             "height": "10",
//             "page": "1"
//           }
//         },
//         {
//           "id": "mandatory_fields_note",
//           "label": "(* marked fields are Mandatory fields)",
//           "type": "textarea",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "72.024",
//             "y": "88.344",
//             "width": "180",
//             "height": "10",
//             "page": "1"
//           }
//         }
//       ]
//     },
//     {
//       "title": "Declaration",
//       "fields": [
//         {
//           "id": "declaration_text",
//           "label": "Declaration",
//           "type": "textarea",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "291.89",
//             "y": "784.32",
//             "width": "46",
//             "height": "8",
//             "page": "2"
//           }
//         },
//         {
//           "id": "declaration_content",
//           "label": "I/We declare that above information is correct. I/We authorize Department of Posts to debit/ recover the charges as applicable from time to time from my/our account for withdrawals using my ATM Card or Internet/Mobile/SMS Banking. I/We undertake to maintain sufficient funds excluding the minimum balance stipulated in my account. I/We will accept full responsibility for transactions done through my/our ATM Card or Internet/Mobile/SMS Banking and agree not to make claims against Department of Posts.",
//           "type": "textarea",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "72.024",
//             "y": "774.6",
//             "width": "486",
//             "height": "50",
//             "page": "2"
//           }
//         }
//       ]
//     },
//     {
//       "title": "Office Use Only",
//       "fields": [
//         {
//           "id": "signature_of_applicant",
//           "label": "Signature of the applicant",
//           "type": "text",
//           "required": true,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "396.07",
//             "y": "673.66",
//             "width": "74",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "sol_id",
//           "label": "SOL ID",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "249.65",
//             "y": "616.18",
//             "width": "130",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "type_of_request",
//           "label": "Type of Request",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "100.7",
//             "y": "604.18",
//             "width": "78",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "type_of_service",
//           "label": "Type of service",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "258.29",
//             "y": "604.18",
//             "width": "73",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "maker_user_id",
//           "label": "Maker User ID",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "398.59",
//             "y": "604.18",
//             "width": "67",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "checker_user_id",
//           "label": "Checker User ID",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "490.06",
//             "y": "604.18",
//             "width": "77",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "date_stamp_post_office",
//           "label": "Date Stamp of Post Office",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "74.784",
//             "y": "545.11",
//             "width": "113",
//             "height": "10",
//             "page": "2"
//           }
//         },
//         {
//           "id": "signature_of_chief",
//           "label": "Signature of Chief/Sr./ Head/ Sub Postmaster",
//           "type": "text",
//           "required": false,
//           "validations": {},
//           "dependent": null,
//           "coordinates": {
//             "x": "360.07",
//             "y": "545.11",
//             "width": "190",
//             "height": "10",
//             "page": "2"
//           }
//         }
//       ]
//     }
//   ]
// }

//   return data;
 
}

export function cleanJson(text){
  const cleaned=text
                .replace('/^```json\s*/i',"")
                .replace('/^```\s*/i',"")
                .replace('/\s*```$/i',"")
                .trim();
  return JSON.parse(cleaned);
}