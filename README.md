# Intelligent Form Generator

Upload PDF Forms and convert them to Digital Forms

## Features
File Uploader<br>
PDF Extraction<br>
Form Schema Generation using LLM<br>
Form Configuration with Validation<br>
Form Generation and Rendering<br>
Form Submission<br>
## Tech Stack
React Js<br>
Tailwind CSS<br>
Redux Toolkit<br>
PDF Tools - <br>
react pdf, pdfjs-dist<br>
Form Rools - <br>
React Hook Forms, Zod<br>
AI Tools -<br>
Tesseract.js<br>
Open AI - GPT 4.1 mini<br>

## Installation
After cloning the repo, please run the following commands.

npm i<br>
npm run dev<br>

Note: - .env is exluded in this repo, LLM call will function only with the API Key. I can share the key if required.

## Usage

Once the application is launched, 

Select Upload Pdf file to upload a Pdf File. Once File is uploaded, you will be able to preview it.

After uploading file, Select Generate Form, it will help you generate the Form.

Once the Form is generated, user can start using the form and as they use the form, the respective field will be highlighted in the PDF.

## Sample PDF Forms

Sample PDF forms are available in the PDF folder with which the application is tested.

## Approaches & Constraints

Two types of PDF form documents were identified.
1. Digital PDFs made using document processors that contains text layers and other document information in it. - React PDF is used for such PDFs and text is extracted using pdfjs-dist.

2. Image based Scanned PDF contains only images, and Tesseract.js is used to extract text from such documents, but the approach was not effective.

## State Management Strategies

Used Redux Toolkit to manage the Application state. Created 2 stores.
1. PDF - Stores the pdf file, extracted data<br>
2. Form - Stores the form schema, focussed field, form submission data.<br>

## AI Adoption

Tesseract. JS - AI based OCR Document processing tool for PDF Text Extraction.
Open AI GPT LLM Model - For generating semaning Form Schema based on the PDF extracted text.