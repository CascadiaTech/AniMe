
import pinataSDK, { PinataPinOptions } from '@pinata/sdk'
import fs from 'fs'
import * as dotenv from 'dotenv'
import { useEffect, useState } from 'react';

const [apikey, setapikey] = useState(String)
const [secret, setsecret] = useState(String)
//${decodeURIComponent(key)}
async function getStaticSecret() {
    const envVars = process.env.PINATA_SECRET_KEY;
    if(envVars)
    return envVars
    };
async function getStaticKey() {
    const envVars = process.env.PINATA_API_KEY;
    if(envVars)
    return envVars
        };
useEffect(() => {
    async function getkey() {
        const  API_KEY  = await getStaticKey()
        setapikey(API_KEY as string)
        return API_KEY
          
        }
    async function getSecret() {
        const  SECRET  = await getStaticSecret()
        setsecret(SECRET as string)
        return SECRET
            
          }
    getkey()
    getSecret()
    
      });

const pinata = new pinataSDK(apikey, secret);

export default async function PinToPinata(path_to_image: string){
//const readableStreamForFile = fs.createReadStream('./metadata/nftmetadata.json');
const readableStreamForFile = fs.createReadStream(path_to_image);
const options = {
    pinataMetadata: {
        name: "AnimeNFT",
    },
    pinataOptions: {
        cidVersion: 0
    }
};

return pinata.pinFileToIPFS(readableStreamForFile, options as PinataPinOptions).then((result) => {
    //handle results here
    console.log(result);
    return result
}).catch((err) => {
    //handle error here
    console.log(err);
});

}




