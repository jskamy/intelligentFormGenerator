//Utility to perform react pdf , pdf js based pdf text extraction

import getTextByRows from "./getTextByRows";
export async function extractWithNative(pdf){
    const extractedTextBlocks = [];
    const pageDimensions=[];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewPort=page.getViewport({
        scale:1
      });
      pageDimensions[pageNum]={
        width:viewPort.width,
        height:viewPort.height
      };
      // console.log(pageDimensions)
      try {
        const text = await page.getTextContent();
        const pageBlocks = text.items
          .filter((item) => item.str?.trim())
          .map((item) => {
            const tx = item.transform[4];
            const ty = item.transform[5];

            return {
              text: item.str,
              x: tx,
              y: ty,
              width: item.width,
              height: item.height,
              page: pageNum,
            };
          });
        extractedTextBlocks.push(...pageBlocks);
      } catch (error) {
        console.log(error);
      }
    }

    return {
        pageDimensions,extractedTextBlocks
    }
}