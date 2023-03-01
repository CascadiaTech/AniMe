import fs from 'fs'
import fs_extra from 'fs-extra'

import { abiObject } from './abi.cjs'
import "@uniswap/widgets/fonts.css";
import {
  getDefaultProvider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
//import { useWeb3React } from "@web3-react/core";
//import React, { useEffect, useState } from "react";

//const { account } = useWeb3React()


async function GetSupply(){
    const provider = getDefaultProvider()
    const NFTabi = abiObject;
    const contractaddress = "0xC1948D3FECaF1B33bB5b1bff22f944Cdc595C218";
    const contract = new Contract(contractaddress, NFTabi, provider);
    const Totalminted = await contract.totalSupply();
    return Totalminted +1;
    

}

// trait3: string, trait4: string, trait5: string,trait6: string, trait7: string, trait8: string, trait9: string, trait10: string
export async function useMetadataUpload(URI: string) {

    fs_extra.emptyDirSync("./ginumetadata")

    let count = await GetSupply()
    const metas = {
        "name":  `Official aniMe NFCT collection #${count}`,
        "description": "Oda presents to you our official anime character set",
        "image": `https://gateway.pinata.cloud/ipfs/${URI}/${count}.png`, //You can replace this dynamic URL with a single image URL. EX: 'ipfs://your_cid/image.png'
        "external_link": "https://www.givewellinu.com/",
        "seller_fee_basis_points": 250,
        "fee_recipient": "0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C",
        "edition": count,
      };

    fs.writeFileSync(
        `./metadata/${count+'.json'}`,
        JSON.stringify(metas, null, 2)
      );
    
    console.log(`${count+'.json'} Created!`);

    return(`./${count}+'.json'`)

};