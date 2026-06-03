import { createWorker } from "tesseract.js";

let worker=null;

export default async function getOCRWorker(){
    if(!worker){
        try {
            worker=await createWorker();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            console.log(worker);
        } catch (error) {
            console.log(error);
        }
    }

    return worker;
}