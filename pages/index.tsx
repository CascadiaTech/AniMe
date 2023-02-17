import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import ClaimComponent from "../components/Claim/ClaimComponent";
import MintCardComponent from "../components/Cards/MintCard";
import { Dropdown } from "flowbite-react";
import DropdownComponent from "../components/Dropdown/DropdownComponent";
import React from "react";
import mergeImages from "merge-images"
import { Image, Canvas } from "canvas"
import ImageDataURI from "image-data-uri"

const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [isended, setisended] = useState(false);
  const videoRef: any = useRef(null);

  const [currentbackgroundImage, setCurrentbackgroundImage] = useState("");
  const [currentTemplateImage, setCurrentTemplateImage] = useState("");
  const [currentclothesImage, setCurrentclothesImage] = useState("");
  const [currenthelmetImage, setCurrenthelmetImage] = useState("");
  const [currentfaceItemImage, setCurrentFaceItemImage] = useState("");
  const [currenteyesImage, setCurrenteyesImage] = useState("");
  const [currenthairImage, setCurrenthairImage] = useState("");
  const [image, setimage] = useState(String);

  const backgroundImages = [
    "/NFTassets/Background/1.png",
    "/NFTassets/Background/2.png",
    "/NFTassets/Background/3.png",
    "/NFTassets/Background/4.png",
  ];
  const templateImage = [
    "/NFTassets/MainTemplate/1.png",
    "/NFTassets/MainTemplate/2.png",
  ];

  const clothesImages = [
    "/NFTassets/Clothes/Clothes/1.png",
    "/NFTassets/Clothes/Clothes/2.png",
    "/NFTassets/Clothes/Clothes/3.png",
    "/NFTassets/Clothes/Clothes/4.png",
    "/NFTassets/Clothes/Clothes/5.png",
    "/NFTassets/Clothes/Clothes/6.png",
    "/NFTassets/Clothes/Clothes/7.png",
    "/NFTassets/Clothes/Clothes/8.png",
    "/NFTassets/Clothes/Clothes/9.png",
    "/NFTassets/Clothes/Clothes/10.png",
    "/NFTassets/Clothes/Clothes/11.png",
    "/NFTassets/Clothes/Clothes/12.png",
    "/NFTassets/Clothes/Clothes/13.png",
    "/NFTassets/Clothes/Clothes/14.png",
    "/NFTassets/Clothes/Clothes/15.png",
    "/NFTassets/Clothes/Clothes/16.png",
    "/NFTassets/Clothes/Clothes/17.png",
    "/NFTassets/Clothes/Clothes/18.png",
    "/NFTassets/Clothes/Clothes/19.png",
    "/NFTassets/Clothes/Clothes/20.png",
    "/NFTassets/Clothes/Clothes/21.png",
    "/NFTassets/Clothes/Clothes/22.png",
    "/NFTassets/Clothes/Clothes/23.png",
    "/NFTassets/Clothes/Clothes/24.png",
    "/NFTassets/Clothes/Clothes/25.png",
    "/NFTassets/Clothes/Clothes/26.png",
    "/NFTassets/Clothes/Clothes/27.png",
    "/NFTassets/Clothes/Clothes/28.png",
    "/NFTassets/Clothes/Clothes/29.png",
  ];

  const faceItemImages = [
    "/NFTassets/FaceItem/1.png",
    "/NFTassets/FaceItem/2.png",
    "/NFTassets/FaceItem/3.png",
    "/NFTassets/FaceItem/4.png",
    "/NFTassets/FaceItem/5.png",
    "/NFTassets/FaceItem/6.png",
    "/NFTassets/FaceItem/7.png",
    "/NFTassets/FaceItem/8.png",
    "/NFTassets/FaceItem/9.png",
    "/NFTassets/FaceItem/10.png",
    "/NFTassets/FaceItem/11.png",
    "/NFTassets/FaceItem/12.png",
  ];
  const eyesImages = [
    "/NFTassets/Eyes/1.png",
    "/NFTassets/Eyes/2.png",
    "/NFTassets/Eyes/3.png",
    "/NFTassets/Eyes/4.png",
    "/NFTassets/Eyes/5.png",
    "/NFTassets/Eyes/6.png",
    "/NFTassets/Eyes/7.png",
    "/NFTassets/Eyes/8.png",
    "/NFTassets/Eyes/9.png",
    "/NFTassets/Eyes/10.png",
    "/NFTassets/Eyes/11.png",
    "/NFTassets/Eyes/12.png",
    "/NFTassets/Eyes/13.png",
    "/NFTassets/Eyes/14.png",
    "/NFTassets/Eyes/15.png",
    "/NFTassets/Eyes/16.png",
    "/NFTassets/Eyes/17.png",
    "/NFTassets/Eyes/18.png",
    "/NFTassets/Eyes/19.png",
  ];
  const helmetImages = [
    "/NFTassets/Helmet/1.png",
    "/NFTassets/Helmet/2.png",
    "/NFTassets/Helmet/3.png",
    "/NFTassets/Helmet/4.png",
    "/NFTassets/Helmet/5.png",
    "/NFTassets/Helmet/6.png",
    "/NFTassets/Helmet/7.png",
    "/NFTassets/Helmet/8.png",
    "/NFTassets/Helmet/9.png",
    "/NFTassets/Helmet/10.png",
    "/NFTassets/Helmet/11.png",
    "/NFTassets/Helmet/12.png",
    "/NFTassets/Helmet/13.png",
    "/NFTassets/Helmet/14.png",
    "/NFTassets/Helmet/15.png",
    "/NFTassets/Helmet/16.png",
    "/NFTassets/Helmet/17.png",
    "/NFTassets/Helmet/18.png",
    "/NFTassets/Helmet/19.png",
    "/NFTassets/Helmet/20.png",
    "/NFTassets/Helmet/21.png",
  ];
  const hairImages = [
    "/NFTassets/Hair/1.png",
    "/NFTassets/Hair/2.png",
    "/NFTassets/Hair/3.png",
    "/NFTassets/Hair/4.png",
    "/NFTassets/Hair/5.png",
    "/NFTassets/Hair/6.png",
    "/NFTassets/Hair/7.png",
    "/NFTassets/Hair/8.png",
    "/NFTassets/Hair/9.png",
    "/NFTassets/Hair/10.png",
    "/NFTassets/Hair/11.png",
    "/NFTassets/Hair/12.png",
    "/NFTassets/Hair/13.png",
    "/NFTassets/Hair/14.png",
    "/NFTassets/Hair/15.png",
    "/NFTassets/Hair/16.png",
    "/NFTassets/Hair/17.png",
    "/NFTassets/Hair/18.png",
    "/NFTassets/Hair/19.png",
    "/NFTassets/Hair/20.png",
    "/NFTassets/Hair/21.png",
    "/NFTassets/Hair/22.png",
    "/NFTassets/Hair/23.png",
    "/NFTassets/Hair/24.png",
    "/NFTassets/Hair/25.png",
    "/NFTassets/Hair/26.png",
    "/NFTassets/Hair/27.png",
    "/NFTassets/Hair/28.png",
    "/NFTassets/Hair/29.png",
  ];

  function renderImages() {
    return (
      <>
        {image == "BACKGROUND" ? (
          <>
            {" "}
            {backgroundImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentbackgroundImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  function renderClothesImages() {
    return (
      <>
        {image == "CLOTHES" ? (
          <>
            {" "}
            {clothesImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentclothesImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
  console.log(currentclothesImage)
  console.log(currentTemplateImage)

  function rendertemplateImage() {
    return (
      <>
        {image == "TEMPLATE" ? (
          <>
            {" "}
            {templateImage.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentTemplateImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  function renderfaceItemsImage() {
    return (
      <>
        {image == "FACEITEM" ? (
          <>
            {" "}
            {faceItemImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentFaceItemImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  function rendereyesImage() {
    return (
      <>
        {image == "EYES" ? (
          <>
            {" "}
            {eyesImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrenteyesImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
  function renderhelmetImages() {
    return (
      <>
        {image == "HELMET" ? (
          <>
            {" "}
            {helmetImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrenthelmetImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  function renderHairImages() {
    return (
      <>
        {image == "HAIR" ? (
          <>
            {" "}
            {hairImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrenthairImage(image)}
                className="max-w-full max-h-full"
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  const handleButtonClick = (imageName: string) => {
    setCurrentbackgroundImage(imageName);
  };

  const handleTemplateClick = (imageName: string) => {
    setCurrentTemplateImage(imageName);
  };

  return (
    <div>
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
        <div className={
            "mx-auto self-center "
          }>
          <p className={'py-5'}></p>
            
            <p
              style={{ fontFamily: "BeatWord" }}
              className={
                "text-3xl lg:text-5xl text-teal-100 text-center self-center mx-auto border-b-4 border-white"
              }
            >
              AniMe
            </p>
            
            <p
              style={{ fontFamily: "MondayFeelings" }}
              className={
                "text-xl lg:text-2xl text-teal-100 text-center pt-6 px-4 self-center mx-auto"
              }
            >
              Create your own NFT character in any way you like!
            </p>
        <div style={{ boxShadow: 'inset 0px 0px 18px 11px #3B3B3B, 0px 0px 23px 5px rgba(255,255,255,0.6)' }}
         className={'flex flex-row border-2 border-gray-300 rounded-xl my-6 justify-center'}>
        <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("BACKGROUND")}>
            {" "}
            Backgrounds
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("CLOTHES")}>
            {" "}
            Clothes
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("TEMPLATE")}>
            Template
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("FACEITEM")}>
            Face Items
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("EYES")}>
            Eyes
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("HELMET")}>
            Helmet
          </button>
          <button style={{ fontFamily: 'MondayFeelings' }} className="px-4 m-5 py-2 text-xl cursor-pointer border-2 border-gray-400 rounded-xl duration-300
         hover:bg-gray-400 hover:border-gray-100 hover:text-gray-900" onClick={() => setimage("HAIR")}>
            Hair
          </button>
          </div>
        <div className={"flex flex-row overflow-hidden"}>
          <div>
            {currentbackgroundImage && (
              <img
                className={"z-0 absolute"}
                width={500}
                height={500}
                src={currentbackgroundImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currentTemplateImage && (
              <img
                className={"z-10 absolute"}
                width={500}
                height={500}
                src={currentTemplateImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currentclothesImage && (
              <img
                className={"z-20 absolute"}
                width={500}
                height={500}
                src={currentclothesImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currentfaceItemImage && (
              <img
                className={"z-30 absolute"}
                width={500}
                height={500}
                src={currentfaceItemImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currenteyesImage && (
              <img
                className={"z-40 absolute"}
                width={500}
                height={500}
                src={currenteyesImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currenthairImage && (
              <img
                className={"z-50 absolute"}
                width={500}
                height={500}
                src={currenthelmetImage}
                alt="Selected background"
              />
            )}
          </div>
          <div>
            {currenthairImage && (
              <img
                className={"z-60 absolute"}
                width={500}
                height={500}
                src={currenthairImage}
                alt="Selected background"
              />
            )}
          </div>

            <p className={'mx-80'}></p>
        
          <div className={"flex flex-col"}>
            <div
              style={{ zIndex: image == "BACKGROUND" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-2 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
              }
            >
              {renderImages()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "CLOTHES" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll"
              }
            >
              {renderClothesImages()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "TEMPLATE" ? 20 : 0, height: 500 }}
              className={"w-32 h-32 cursor-pointer absolute"}
            >
              {rendertemplateImage()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "FACEITEM" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-2 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
              }
            >
              {renderfaceItemsImage()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "EYES" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-2 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
              }
            >
              {rendereyesImage()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "HELMET" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-2 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
              }
            >
              {renderhelmetImages()}
            </div>
            <p className={"mx-32"}></p>
            <div
              style={{ zIndex: image == "HAIR" ? 20 : 0, height: 500 }}
              className={
                "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-2 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
              }
            >
              {renderHairImages()}
            </div>
          </div>
        </div>
        
        <p className={'my-80'}></p>
        <p className={'py-20'}></p>
        <div className="flex flex-col content-center mx-auto justify-center items-center max-w-screen">
              <button
                style={{ fontFamily: "BeatWord" }}
                type="button"
                className="w-fit mx-0 px-20 md:px-32 self-center content-center tn:mx-0 elevation-10 hover:elevation-50 md:mx-24 h-24
                 clip-path-mycorners justify-self-center mt-10 text-gray-100 bg-teal-500 hover:bg-blue-900 transition ease-in-out duration-700
                 text-3xl lg:text-4xl "
              >
                Start Mintin'
              </button>
            </div>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;

