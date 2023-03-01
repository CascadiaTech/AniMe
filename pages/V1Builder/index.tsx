import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../../components/Footer/FooterComponent";
import DualCardComponent from "../../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import { useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import ClaimComponent from "../../components/Claim/ClaimComponent";
import MintCardComponent from "../../components/Cards/MintCard";
import { Dropdown } from "flowbite-react";
import DropdownComponent from "../../components/Dropdown/DropdownComponent";
import React from "react";
import AniMelogo from "../assets/images/AniMe-logo.jpg";
import { backgroundImages } from "../../components/ImageArrays/ImageArraysComponent";
import { templateImage } from "../../components/ImageArrays/ImageArraysComponent";
import { clothesImages } from "../../components/ImageArrays/ImageArraysComponent";
import { faceItemImages } from "../../components/ImageArrays/ImageArraysComponent";
import { eyesImages } from "../../components/ImageArrays/ImageArraysComponent";
import { helmetImages } from "../../components/ImageArrays/ImageArraysComponent";
import { hairImages } from "../../components/ImageArrays/ImageArraysComponent";
import { handItemImages } from "../../components/ImageArrays/ImageArraysComponent";
import { mouthImages } from "../../components/ImageArrays/ImageArraysComponent";
import mergeImages from "merge-images";
import Image from "next/image";
import { Canvas } from "canvas";
import ImageDataURI from "image-data-uri";
import { useImageUpload } from "../../components/ImageUploader/imageupload";
import CharacterBulder from "../../components/3DCharacterBuilder/Builder";
const V1Builder: NextPage = () => {
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
  const [currenthandItemImage, setCurrenthandItemImage] = useState("");
  const [currentmouthImage, setCurrentmouthImage] = useState("");
  const [currenteyesImage, setCurrenteyesImage] = useState("");
  const [currenthairImage, setCurrenthairImage] = useState("");
  const [image, setimage] = useState(String);

  const [backgroundButton, setBackgroundButton] = useState(
    "/Buttons/BackgroundButtonGrey.png"
  );
  const [clothesButton, setClothesButton] = useState(
    "/Buttons/ClothesButtonGrey.png"
  );
  const [templateButton, setTemplateButton] = useState(
    "/Buttons/TemplateButtonGrey.png"
  );
  const [faceItemsButton, setfaceItemsButton] = useState(
    "/Buttons/FaceItemsButtonGrey.png"
  );
  const [eyesButton, seteyesButton] = useState(
    "/Buttons/EyesButtonRed.png"
  );
  const [helmetButton, sethelmetButton] = useState(
    "/Buttons/HelmetButtonRed.png"
  );
  const [hairButton, sethairButton] = useState(
    "/Buttons/HairButtonRed.png"
  );
  const [handItemsButton, sethandItemsButton] = useState(
    "/Buttons/HandItemsButtonRed.png"
  );
  const [mouthButton, setmouthButton] = useState(
    "/Buttons/mouthButtonRed.png"
  );


  const handleMouseEnterbgRed = () => {
    setBackgroundButton("/Buttons/BackgroundButtonRed.png");
  };
  const handleMouseLeavebgGrey = () => {
    setBackgroundButton("/Buttons/BackgroundButtonGrey.png");
  };

  const handleMouseEnterbtnRed = () => {
    setClothesButton("/Buttons/ClothesButtonRed.png");
  };
  const handleMouseLeavebtnGrey = () => {
    setClothesButton("/Buttons/ClothesButtonGrey.png");
  };

  const handleMouseEnterTempRed = () => {
    setTemplateButton("/Buttons/TemplateButtonRed.png");
  };
  const handleMouseLeaveTempGrey = () => {
    setTemplateButton("/Buttons/TemplateButtonGrey.png");
  };

  const handleMouseEnterFcItmRed= () => {
    setfaceItemsButton("/Buttons/FaceItemsButtonRed.png");
  };
  const handleMouseLeaveFcItmGrey = () => {
    setfaceItemsButton("/Buttons/FaceItemsButtonGrey.png");
  };

  const handleMouseEnterEyesGrey= () => {
    seteyesButton("/Buttons/EyesButtonGrey.png");
  };
  const handleMouseLeaveEyesRed = () => {
    seteyesButton("/Buttons/EyesButtonRed.png");
  };

  const handleMouseEnterHlmGrey= () => {
    sethelmetButton("/Buttons/HelmetButtonGrey.png");
  };
  const handleMouseLeaveHlmRed = () => {
    sethelmetButton("/Buttons/HelmetButtonRed.png");
  };

  const handleMouseEnterHairGrey= () => {
    sethairButton("/Buttons/HairButtonGrey.png");
  };
  const handleMouseLeaveHairRed = () => {
    sethairButton("/Buttons/HairButtonRed.png");
  };

  const handleMouseEnterHndItmGrey= () => {
    sethandItemsButton("/Buttons/HandItemsButtonGrey.png");
  };
  const handleMouseLeaveHndItmRed = () => {
    sethandItemsButton("/Buttons/HandItemsButtonRed.png");
  };

  const handleMouseEnterMouthGrey= () => {
    setmouthButton("/Buttons/MouthButtonGrey.png");
  };
  const handleMouseLeaveMouthRed = () => {
    setmouthButton("/Buttons/MouthButtonRed.png");
  };

  const handleTouchMove = (e:any) => {
    const touch = e.touches[0];
    const buttonRect = e.target.getBoundingClientRect();
    const isInsideButton =
      touch.clientX >= buttonRect.left &&
      touch.clientX <= buttonRect.right &&
      touch.clientY >= buttonRect.top &&
      touch.clientY <= buttonRect.bottom;
  
    if (isInsideButton) {
      setBackgroundButton("/Buttons/BackgroundButtonRed.png");
    } else {
      setBackgroundButton("/Buttons/BackgroundButtonGrey.png");
    }
  };


  const handleTouchEnd = () => {
    setBackgroundButton("/Buttons/BackgroundButtonGrey.png");
    setimage("BACKGROUND");
  };

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

  function renderhandItemsImage() {
    return (
      <>
        {image == "HANDITEM" ? (
          <>
            {" "}
            {handItemImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrenthandItemImage(image)}
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
  function rendermouthImage() {
    return (
      <>
        {image == "MOUTH" ? (
          <>
            {" "}
            {mouthImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentmouthImage(image)}
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

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #FF2E41 0%, #FF2E41 46%, #FF2E41 100%)",
      }}
    >
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
        <div className={""}>
          <p className={"py-5"}></p>
          <p
            style={{
              fontFamily: "BeatWord",
              textShadow: "0px 0px 18px rgba(227,0,0,0.75)",
            }}
            className={
              "text-3xl lg:text-5xl text-red-100 text-center w-fit px-10 self-center mx-auto"
            }
          >
            <Image
              className={"justify-center mx-auto self-center"}
              width={425}
              height={425}
              src={AniMelogo}
            ></Image>
          </p>

          <p
            style={{ fontFamily: "MondayFeelings" }}
            className={
              "text-xl lg:text-2xl text-teal-100 text-center pt-6 pb-4 px-10 self-center mx-auto border-b-4 border-red-700"
            }
          >
            Create your own NFT character in any way you like!
          </p>
          <div
            style={{
              boxShadow:
                "inset 0px 0px 15px 5px rgba(255,69,69,0.65), 0px 0px 12px 3px rgba(255,41,41,0.65)",
            }}
            className={
              "flex flex-row w-fit justify-center mx-auto border-2 border-gray-300 rounded-2xl my-6 justify-center"
            }
          >
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={backgroundButton}
            onMouseEnter={() => setBackgroundButton("/Buttons/BackgroundButtonRed.png")}
            onMouseLeave={() => setBackgroundButton("/Buttons/BackgroundButtonGrey.png")}
            onTouchStart={handleMouseEnterbgRed}
            onTouchMove={handleTouchMove}
            onClick={() => setimage("BACKGROUND")}
            onTouchEnd={handleTouchEnd}
          />
            <p className={"px-2"}></p>
            <Image
              className="duration-300 hover:cursor-pointer"
              width={150}
              height={50}
              src={clothesButton}
              onTouchStart={handleMouseEnterbtnRed}
              onTouchEnd={handleMouseLeavebtnGrey}
              onClick={() => setimage("CLOTHES")}
            />
            <p className={"px-2"}></p>
            <Image
              className="duration-300 hover:cursor-pointer"
              width={150}
              height={50}
              src={templateButton}
              onMouseEnter={handleMouseEnterTempRed}
              onMouseLeave={handleMouseLeaveTempGrey}
              onClick={() => setimage("TEMPLATE")}
            />
            <p className={"px-2"}></p>
            <Image
              className="duration-300 hover:cursor-pointer"
              width={150}
              height={50}
              src={faceItemsButton}
              onMouseEnter={handleMouseEnterFcItmRed}
              onMouseLeave={handleMouseLeaveFcItmGrey}
              onClick={() => setimage("FACEITEM")}
            />
          </div>

          <div
            style={{
              boxShadow:
                "inset 0px 0px 15px 5px rgba(255,69,69,0.65), 0px 0px 12px 3px rgba(255,41,41,0.65)",
            }}
            className={
              "flex flex-row w-fit justify-center mx-auto border-2 border-gray-300 rounded-2xl my-6 justify-center"
            }
          >
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={eyesButton}
            onMouseEnter={handleMouseEnterEyesGrey}
            onMouseLeave={handleMouseLeaveEyesRed}
            onClick={() => setimage("EYES")}
          />
          <p className={"px-2"}></p>
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={helmetButton}
            onMouseEnter={handleMouseEnterHlmGrey}
            onMouseLeave={handleMouseLeaveHlmRed}
            onClick={() => setimage("HELMET")}
          />
          <p className={"px-2"}></p>
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={hairButton}
            onMouseEnter={handleMouseEnterHairGrey}
            onMouseLeave={handleMouseLeaveHairRed}
            onClick={() => setimage("HAIR")}
          />
          <p className={"px-2"}></p>
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={handItemsButton}
            onMouseEnter={handleMouseEnterHndItmGrey}
            onMouseLeave={handleMouseLeaveHndItmRed}
            onClick={() => setimage("HANDITEM")}
          />
          <p className={"px-2"}></p>
          <Image
            className="duration-300 hover:cursor-pointer"
            width={150}
            height={50}
            src={mouthButton}
            onMouseEnter={handleMouseEnterMouthGrey}
            onMouseLeave={handleMouseLeaveMouthRed}
            onClick={() => setimage("MOUTH")}
          />
          </div>

          <div className={""}>
            <div
              className={
                "w-fit px-10 self-center mx-auto flex flex-col md:flex-col lg:flex-col xl:flex-row overflow-hidden"
              }
            >
              <div>
                {currentbackgroundImage && (
                  <img
                    className={"z-0 absolute"}
                    width={425}
                    height={425}
                    src={currentbackgroundImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currentTemplateImage && (
                  <img
                    className={"z-10 absolute"}
                    width={425}
                    height={425}
                    src={currentTemplateImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currentclothesImage && (
                  <img
                    className={"z-20 absolute"}
                    width={425}
                    height={425}
                    src={currentclothesImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currentfaceItemImage && (
                  <img
                    className={"z-30 absolute"}
                    width={425}
                    height={425}
                    src={currentfaceItemImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currenteyesImage && (
                  <img
                    className={"z-40 absolute"}
                    width={425}
                    height={425}
                    src={currenteyesImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currenthelmetImage && (
                  <img
                    className={"z-50 absolute"}
                    width={425}
                    height={425}
                    src={currenthelmetImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currenthairImage && (
                  <img
                    className={"z-30 absolute"}
                    width={425}
                    height={425}
                    src={currenthairImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currenthandItemImage && (
                  <img
                    className={"z-70 absolute"}
                    width={425}
                    height={425}
                    src={currenthandItemImage}
                    alt="Selected background"
                  />
                )}
              </div>
              <div>
                {currentmouthImage && (
                  <img
                    className={"z-50 absolute"}
                    width={425}
                    height={425}
                    src={currentmouthImage}
                    alt="Selected background"
                  />
                )}
              </div>

              <p className={"mx-0 sm:mx-0 md:mx-0 lg:mx-0 xl:mx-80"}></p>
              <p className={"my-72 md:my-72 lg:my-72 xl:my-0"}></p>

              <div className={"mx-auto justify-center text-center mr-40"}>
                <div
                  style={{
                    zIndex: image == "BACKGROUND" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderImages()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "CLOTHES" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderClothesImages()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "TEMPLATE" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {rendertemplateImage()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "FACEITEM" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderfaceItemsImage()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "EYES" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {rendereyesImage()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "HELMET" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderhelmetImages()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "HAIR" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderHairImages()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "HANDITEM" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {renderhandItemsImage()}
                </div>
                <p className={"mx-32"}></p>
                <div
                  style={{
                    zIndex: image == "MOUTH" ? 20 : 0,
                    height: 425,
                    width:425,
                  }}
                  className={
                    "w-1/4 h-1/4 cursor-pointer absolute grid grid-cols-3 gap-1 overflow-scroll px-4 py-2 mx-auto justify-center border-2 border-gray-300 bg-gray-800 rounded-xl"
                  }
                >
                  {rendermouthImage()}
                </div>
              </div>
            </div>
          </div>

          <p className={"my-80"}></p>
          <p className={"py-20"}></p>
          <div className="flex flex-col content-center mx-auto justify-center items-center max-w-screen">
            <button
              style={{
                fontFamily: "BeatWord",
                boxShadow: "0px 0px 10px 5px rgba(255,0,0,0.7)",
              }}
              type="button"
              className="w-fit border-2 border-gray-400 mx-0 px-20 md:px-32 self-center content-center tn:mx-0 elevation-10 hover:elevation-50 md:mx-24 h-24
                 justify-self-center mt-10 rounded-xl text-gray-100 hover:bg-blue-900 transition ease-in-out duration-700
                 text-3xl lg:text-4xl "
            >
              Mint
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default V1Builder;