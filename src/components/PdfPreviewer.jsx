/*
  This component loads the PDF file, extract the data, preview the pdf file and perform highlight of the field based on the selected field in the form.
*/

import React, { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";

import { Document, Page, pdfjs } from "react-pdf";

// import { usePdfContext } from "../contexts/pdfContext.jsx";

import { extractPdfData } from "../utils/pdfs/extractPdfData.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageDimensions,
  setPdfTextBlocks,
} from "../features/pdf/pdfSlice.js";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import LoadingComponent from "./LoadingComponent.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfPreviewer = () => {
  // const { state, dispatch } = usePdfContext();
  const dispatch = useDispatch();

  // const { file, selectedField,pageDimensions:pageData } = state;
  const file = useSelector((state) => state.pdf.file);
  const selectedField = useSelector((state) => state.form.selectedField);
  const pageData = useSelector((state) => state.pdf.pageDimensions);

  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(null);

  const pageRef = useRef({});
  const PAGE_WIDTH_OFFSET = 0;
  const PAGE_HEIGHT_OFFSET = 15;
  const FIELD_WIDTH_OFFSET=15;
  const FIELD_HEIGHT_OFFSET=15;


  //Capture PDF Page width with respect to the container
  useEffect(() => {

    function updateWidth() {
      if (containerRef.current) {
        setPageWidth(containerRef.current.clientWidth - 32);
      }
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [file]);

  //Scroll to the respective page in which the selected field exist.
  useEffect(() => {
    if (!selectedField?.coordinates?.page) {
      return;
    }

    const pageNo = selectedField?.coordinates?.page;

    pageRef.current[pageNo]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // console.log(selectedField);
  }, [selectedField]);


  //Perform PDF Extraction
  async function onDocumentLoad(pdf) {
    try {
      setIsLoading(true);
      setNumPages(pdf.numPages);

      const { pageDimensions, groupedText } = await extractPdfData(pdf);
     
      dispatch(setPdfTextBlocks(groupedText));
      dispatch(setPageDimensions(pageDimensions));

      // setIsLoading(false);
      setIsReady(true);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }
 
  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Upload a PDF file to preview
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full bg-gray-200" ref={containerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoad}
        loading="Loading PDF ...."
      >
        {
          isLoading && <LoadingComponent message="PDF file is being loaded"/>
        }

        {!isLoading &&
          Array.from(new Array(numPages), (_, index) => {
            const pageN=index+1;
            // console.log(pageData);
            const scale=pageWidth/pageData?.[index+1]?.width;      
            return(<div
              key={`page_${index + 1}`}
              className="relative mb-4 flex justify-center"
              ref={(el) => (pageRef.current[index + 1] = el)}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                onRenderSuccess={()=>{
                  console.log("page rendered",index+1)
                }}
              />
              {selectedField?.coordinates?.page == index+1 &&  (
                <div
                  className="absolute border-4 border-red-500 bg-red-100/30 pointer-events-none animate-pulse"
                  style={{
                    left:(selectedField?.coordinates?.x*scale)-PAGE_WIDTH_OFFSET,
                    top:(pageData?.[index+1]?.height-selectedField?.coordinates?.y)*scale-PAGE_HEIGHT_OFFSET,
                    width:selectedField.coordinates.width ? parseInt(selectedField.coordinates.width)+FIELD_WIDTH_OFFSET : 150,
                    height:selectedField.coordinates.height ? parseInt(selectedField.coordinates.height)+FIELD_HEIGHT_OFFSET : 20,
                  }}
                ></div>
              )}
            </div>)
          })}
      </Document>
    </div>
  );
};

export default PdfPreviewer;
