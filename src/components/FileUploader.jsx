/*
  This component enable user to upload a pdf file.
*/

import React from 'react'

import { useDispatch } from 'react-redux';
import { setFile } from '../features/pdf/pdfSlice.js';
import generateFormSchema from '../services/llmService.js'

const FileUploader = () => {

  // const {state,dispatch}=usePdfContext();
  const dispatch=useDispatch(); 
  const handleFileUpload=(event)=>{
    const file=event.target.files[0];

    if(file?.type !== "application/pdf"){
      alert("Upload a Valid PDF");
      return
    }

    dispatch(setFile(file));

  }

  return (
    
      <label htmlFor="pdf-upload" className='cursor-pointer px-5 py-3 border rounded-lg border-gray-300 bg-gray-600 hover:bg-gray-700 text-white transition-colors font-medium'>
        Upload Pdf file
        <input type='file' id='pdf-upload' accept='application/pdf' className='hidden' onChange={handleFileUpload} />
      </label>
  )
}

export default FileUploader