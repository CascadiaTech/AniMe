import mergeImages from "merge-images"
import { Image, Canvas } from "canvas"
import ImageDataURI from "image-data-uri"
import PinToPinata from './pinatauploader'
import { useMetadataUpload } from "./metadataupload";
// trait3: string, trait4: string, trait5: string,trait6: string, trait7: string, trait8: string, trait9: string, trait10: string
export async function useImageUpload(trait1: string, trait2: string,trait3: string, trait4: string, trait5: string,trait6: string, trait7: string, trait8: string, trait9: string) {
    let images = [];
    let outputPath = './'
    let id = 1;
    let FormattedPaths: string[] = []
    images.push(trait1, trait2, trait3, trait4, trait5, trait6, trait7, trait8,trait9)
    images.forEach(image=> {
       FormattedPaths.push("../.." + image)
    })
    const b64 = await mergeImages(FormattedPaths, { Canvas: Canvas, Image: Image });
    let success = await ImageDataURI.outputFile(b64, outputPath + `${id}.png`);
    if(success){
        //upload the image to ipfs
        const URI = await PinToPinata(outputPath + `${id}.png`)

        if(URI){
         let success = await useMetadataUpload(URI as unknown as string)
         const finalUri = await PinToPinata(success)
         return finalUri
        }
        else return null
    
    }
};

//in mint function feed in metadat url then done. 
// need to make sure that it sets the way they go over each other, bg first, body next, eyesnext, helmet, etc. 




