# Intelligent Form Generator

Upload PDF Forms and convert them to Digital Forms

## Features
File Uploader
PDF Extraction
Form Schema Generation using LLM
Form Configuration with Validation
Form Generation and Rendering
Form Submission
## Tech Stack
React Js
Tailwind CSS
Redux Toolkit
PDF Tools - 
react pdf, pdfjs-dist
Form Rools - 
React Hook Forms, Zod
AI Tools -
Tesseract.js
Open AI - GPT 4.1 mini

## Installation
After cloning the repo, please run the following commands.

npm i
npm run dev

Note: - .env is exluded in this repo, LLM call will function only with the API Key. I can share the key if required.

## Usage

Once the application is launced, 

Select Upload Pdf file to upload a Pdf File. Once File is uploaded, you will be able to preview it.

After uploading file, Select Generate Form, it will help you generate the Form.

Once the Form is generated, user can start using the form and as they use the form, the respective field will be highlighted in the PDF.

## Sample PDF Forms

Sample PDF forms are available in the PDF folder with which the application is tested.

## Constraints

Two types of PDF form documents were identified.
1. Digital PDFs made using document processors that contains text layers and other document information in it. - React PDF is used for such PDFs and text is extracted using pdfjs-dist.

2. Image based Scanned PDF contains only images, and Tesseract.js is used to extract text from such documents, but the approach was not effective.

## AI Adoption

Tesseract. JS - AI based OCR Document processing tool for PDF Text Extraction.
Open AI GPT LLM Model - For generating semaning Form Schema based on the PDF extracted text.