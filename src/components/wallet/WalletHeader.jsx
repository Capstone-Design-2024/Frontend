import React from "react";
import {
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import copyIcon from "../../assets/icons/copy.svg";
import keyIcon from "../../assets/icons/key.svg";
import logo from "../../assets/itemizeLogo.png";

const WalletHeader = ({
  address,
  balance,
  isCopied,
  setIsCopied,
  copyToClipboard,
  handleDialogToggle,
  setPage,
}) => (
  <div className="p-4">
    <div className="space-x-4 items-center">
      <div>
        <div className="flex justify-between items-center">
          {balance ? (
            <>
              <div className="flex justify-start space-x-3">
                <Typography variant="h5" color="black">
                  Wallet Address
                </Typography>
              </div>
              <div className="flex justify-center space-x-2">
                <Tooltip
                  content={isCopied ? "Copied" : "Copy address"}
                  className="z-[10000] bg-white text-gray-700"
                >
                  <IconButton
                    variant="text"
                    color="black"
                    onClick={() => copyToClipboard(address)}
                    onMouseLeave={() => setIsCopied(false)}
                  >
                    <img src={copyIcon} alt="copy" className="w-5 h-5" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  content={"Show private key"}
                  className="z-[10000] bg-white text-black"
                >
                  <IconButton
                    color="black"
                    variant="text"
                    onClick={() => handleDialogToggle("pkOpen")}
                  >
                    <img src={keyIcon} alt="key" className="w-5 h-5" />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          ) : (
            <div className="flex justify-between w-full items-center">
              <div className="bg-gray-300 animate-pulse w-40 h-7 rounded-md"></div>
              <div className="flex justify-start space-x-2 mt-4 items-center">
                <div className="bg-gray-300 animate-pulse w-5 h-5 rounded-md"></div>
                <div className="bg-gray-300 animate-pulse w-5 h-5 rounded-md"></div>
              </div>
            </div>
          )}
        </div>
        {balance ? (
          <Typography variant="h6" className="text-gray-700 font-medium mt-1">
            {`${
              address ? address : "A94A8FE5CCB19BA61C4C0873D391E987982FBBD3"
            }`}
          </Typography>
        ) : (
          <div className="animate-pulse bg-gray-300 rounded-md w-3/4 h-6 mt-1"></div>
        )}
        <hr className="my-2" />
        {balance ? (
          <div className="flex justify-between w-full px-2 py-3 rounded-md mb-2">
            <div className="flex justify-start gap-x-2">
              <img
                alt="logo"
                src={logo}
                className="w-7 h-7 object-scale-down"
              />
              <Typography variant="h6" className="font-medium text-black">
                PNP
              </Typography>
            </div>
            <div className="flex justify-start items-center">
              <Typography variant="h6" className="font-medium text-black">
                {balance !== null ? (+balance).toLocaleString() : 0}
              </Typography>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between py-3 w-full">
              <div className="flex justify-start gap-x-2">
                <div className="animate-pulse bg-gray-300 rounded-full w-7 h-7"></div>
                <div className="animate-pulse bg-gray-300 rounded-md w-10 h-7"></div>
              </div>
              <div className="animate-pulse bg-gray-300 rounded-md w-24 h-7"></div>
            </div>
          </>
        )}
      </div>
    </div>
    <div className="flex space-x-2 w-full">
      <div className="w-1/2 p-0.5 bg-gradient-to-tr from-red-400 via-yellow-300 to-orange-700 rounded-lg animate-gradient-x">
        <button
          className="w-full hidden !normal-case lg:inline-block text-white py-3 rounded-md bg-white hover:bg-gray-100"
          onClick={() => handleDialogToggle("open")}
        >
          <div className="flex justify-center space-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
            <Typography variant="small" className="font-medium text-black">
              Charge
            </Typography>
          </div>
        </button>
      </div>
      <div className="w-1/2 p-0.5 bg-gradient-to-tr from-orange-400 via-cyan-300 to-deep-purple-700 rounded-lg animate-gradient-x">
        <button
          className="w-full hidden !normal-case lg:inline-block text-white py-3 rounded-md bg-white hover:bg-gray-100"
          onClick={() => setPage(1)}
        >
          <div className="flex justify-center items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            <Typography variant="small" className="font-medium text-black">
              Swap
            </Typography>
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default WalletHeader;
