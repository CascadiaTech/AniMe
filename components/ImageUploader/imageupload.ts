import mergeImages from "merge-images"
import { Image, Canvas } from "canvas"
import ImageDataURI from "image-data-uri"
import PinToPinata from './pinatauploader'
import { useMetadataUpload } from "./metadataupload";

import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Get a reference to the Firebase Storage service


// trait3: string, trait4: string, trait5: string,trait6: string, trait7: string, trait8: string, trait9: string, trait10: string
export async function useImageUpload(trait1: string, trait2: string,trait3: string, trait4: string, trait5: string,trait6: string, trait7: string, trait8: string, trait9: string) {
    
    const firebaseConfig = {
        apiKey: "AIzaSyAcN4LwJ0sbDPL0WhJ9YkWf2G9WuWTGPDk",
        authDomain: "anime-50037.firebaseapp.com",
        projectId: "anime-50037",
        storageBucket: "anime-50037.appspot.com",
        messagingSenderId: "822619001858",
        appId: "1:822619001858:web:e1686ecba706d339d2031b",
        measurementId: "G-CS3QMBEXPP"
      };
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app);
      // Initialize Firebase
    
      if (typeof window !== 'undefined') {
        const analytics = getAnalytics(app);
      }
// Get a reference to the file you want to upload
const file =' ... '// Replace this with your own code to get the file

// Create a reference to the location where you want to store the file
const storageRef = ref(storage, 'path/to/image.jpg');

// Upload the file to Firebase Storage
uploadBytes(storageRef, file as unknown as Blob | Uint8Array | ArrayBuffer)
  .then(() => {
    console.log('File uploaded successfully!');
  })
  .catch((error) => {
    console.error('Error uploading file:', error);
  });
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




