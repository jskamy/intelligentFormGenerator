//Extract pdf text using tesseract.js for image based pdf

import Tesseract from "tesseract.js"

import getOCRWorker from "./getOCRWorker";
import getTextByRows from "./getTextByRows"

export default async function extractWithOCR(pdf){
    const extractedTextBlocks=[];
    const pageDimensions=[];

    for(let pageNum=1;pageNum<=pdf.numPages;pageNum++){
        const page=await pdf.getPage(pageNum);

        const viewPort=page.getViewport({
            scale:3,
        });

        pageDimensions[pageNum]={
            width:viewPort.width,
            height:viewPort.height
        }

        const canvas=document.createElement("canvas");

        const ctx=canvas.getContext("2d");

        if(!ctx){
            throw new Error("Canvas Not available");
        }

        canvas.width=viewPort.width;
        canvas.height=viewPort.height;

       try {
        const renderPage=page.render({
            canvasContext:ctx,
            viewport:viewPort,
        });

        await renderPage.promise;

        const worker=await getOCRWorker();

        // const result=await Tesseract.recognize(canvas,"eng");
        const result=await worker.recognize(canvas);

        console.log("OCR data",result);

        const pageBlocks=result.data.symbols
        .filter(word=>word.text?.trim())
        // .filter(word=>word.confidence > 60)
        .map((word)=>({
            text:word.text,
            x:word.bbox.x0,
            y:word.bbox.y0,
            width:word.bbox.x1 - word.bbox.x0,
            height:word.bbox.y1-word.bbox.y0,
            page:pageNum,
        }))
        console.log(pageBlocks);
        extractedTextBlocks.push(...pageBlocks);
       } catch (error) {
        console.log(error);
       }
    } 

    // const groupedText = getTextByRows(extractedTextBlocks);
    // console.log(groupedText);

    return {
        pageDimensions,extractedTextBlocks
    }
}