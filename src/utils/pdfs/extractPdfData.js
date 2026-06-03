//This utility will extract the pdf data. it will check if pdf js based extraction works, if not it will pass the file to tesseract.js

import { extractWithNative } from "./extractWithNative";
import extractWithOCR from "./extractWithOCR";
import getTextByRows from "./getTextByRows";

export async function extractPdfData(pdf) {
  let {pageDimensions,extractedTextBlocks}=await extractWithNative(pdf);

  console.log("Native Extraction",extractedTextBlocks.length);

  //If PDF is image based
  if(extractedTextBlocks.length === 0 ){
    console.log("PDF is image based");

    ({pageDimensions,extractedTextBlocks}=await extractWithOCR(pdf));
  }

  const groupedText=getTextByRows(extractedTextBlocks);

  return {pageDimensions,groupedText}
}