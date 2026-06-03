import React, { useState } from 'react'


import PdfPreviewer from './components/PdfPreviewer'
import FileUploader from './components/FileUploader';
import FormBuilder from './components/FormBuilder';

import DynamicForm from './components/DynamicForm'

const App = () => {
  
  const [file,setFile]=useState(null);

  const handleFileChange=(event)=>{
    const uploadedFile=event.target.files[0];

    if(uploadedFile?.type === "application/pdf"){
      setFile(uploadedFile);
    }else{
      alert("Upload only pdf file");
    }
  }
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
       <h1 className='text-lg p-2 pl-5 border-b border-gray-400'>
          {/* Intelligent Dynamic Form Generator - Using React PDF, Tesseract, Open AI, React Hook Forms, Zod, Redux Toolkit, Tailwind CSS */}
          Intelligent Dynamic Form Generator
        </h1>
      <div className='p-2 bg-white border-b border-gray-400 shadow flex flex-row flex-wrap gap-3 justify-around'>
        <FileUploader />
        <FormBuilder/>
      </div>

      <div className='flex-1 overflow-hidden'>
        <div className='h-full flex flex-col lg:flex-row bg-white rounded-x1 shadow'>
          <div className='h-1/2 lg:h-full lg:w-1/2 min-w-0 border-b lg:border-b-0 border-gray-300 bg-gray-200'>
            <PdfPreviewer />
          </div>
          <div className='h-1/2 lg:h-full lg:w-1/2 min-w-0 p-2'>
            <DynamicForm />
          </div>
        </div>
      </div>

     <h1 className='text-xs text-center p-1 border-t border-gray-400 text-gray-600'>
          Built for the CAMS Interview Brief
      </h1>
        
    </div>
  )
}

export default App