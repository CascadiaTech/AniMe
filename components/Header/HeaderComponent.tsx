import "tailwindcss-elevation";
import Image from "next/image";
import React, { useState } from "react";
//import Image from "next/image";
import Link from "next/link";
import AniMeLogo from "../../assets/images/AniMe-logo.jpg";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import { Dropdown } from "flowbite-react";
export default function HeaderComponent() {
  const [websiteButton, setwebsiteButton] = useState(
    "/Buttons/WebsiteButtonGrey.png"
  );
  const [dashboardButton, setdashboardButton] = useState(
    "/Buttons/DashboardButtonGrey.png"
  );
  const [NftMintButton, setNftMintButton] = useState(
    "/Buttons/NftMintButtonRed.png"
  );


  const handleMouseEnterWbsRed = () => {
    setwebsiteButton("/Buttons/WebsiteButtonRed.png");
  };
  const handleMouseLeaveWbsGrey = () => {
    setwebsiteButton("/Buttons/WebsiteButtonGrey.png");
  };

  const handleMouseEnterDshBrdRed = () => {
    setdashboardButton("/Buttons/DashboardButtonRed.png");
  };
  const handleMouseLeaveDshBrdGrey = () => {
    setdashboardButton("/Buttons/DashboardButtonGrey.png");
  };

  const handleMouseEnterNftMntGrey = () => {
    setNftMintButton("/Buttons/NftMintButtonGrey.png");
  };
  const handleMouseLeaveNftMntRed = () => {
    setNftMintButton("/Buttons/NftMintButtonRed.png");
  };

  return (
    <div>
      <nav className="bg-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-nowrap justify-left items-center mx-auto">
          <div></div>
          <div className="md:order-2 px-2 md:pb-5 lg:pb-6">
            <ConnectWallet></ConnectWallet>
          </div>
          <div className="sm:visible md:hidden">
            <Dropdown label="Navigation">
              <Dropdown.Header>
                <span className="block text-sm">Navigation</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href="/">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "MondayFeelings" }}
                  >
                    Dashboard{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/Dapp/NFTMintPage">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "MondayFeelings" }}
                  >
                    NFT Mint{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <a
                  onClick={() =>
                    window.open("https://www.givewellinu.com/home")
                  }
                >
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "MondayFeelings" }}
                  >
                    Website
                  </p>
                </a>
              </Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown>
          </div>
          <div
            className="h-0 justify-left items-left text-left w-full md:flex md:h-fit md:w-auto order-1"
            id="navbar-sticky"
          >
            <ul className="invisible md:visible h-auto my-4 flex flex-row justify-left text-left items-left p-4 mt-4 bg-black rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Image width={60} height={60} src={AniMeLogo} alt="asa"></Image>
              </li>
              <li>
                <Image
                  className="duration-300 hover:cursor-pointer"
                  width={150}
                  height={50}
                  src={websiteButton}
                  onMouseEnter={handleMouseEnterWbsRed}
                  onMouseLeave={handleMouseLeaveWbsGrey}
                  onClick={() =>
                    window.open("https://www.givewellinu.com/home")
                  }
                />
              </li>
              <li>
                <Link href={"/"}>
                  <Image
                    className="duration-300 hover:cursor-pointer"
                    width={150}
                    height={50}
                    src={dashboardButton}
                    onMouseEnter={handleMouseEnterDshBrdRed}
                    onMouseLeave={handleMouseLeaveDshBrdGrey}
                  />
                </Link>
              </li>
              <li>
                <Link href="/Dapp/NFTMintPage">
                  <Image
                    className="duration-300 hover:cursor-pointer"
                    width={150}
                    height={50}
                    src={NftMintButton}
                    onMouseEnter={handleMouseEnterNftMntGrey}
                    onMouseLeave={handleMouseLeaveNftMntRed}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
