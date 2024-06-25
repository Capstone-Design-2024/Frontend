import React from "react";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import copyIcon from "../../assets/icons/copy.svg";
import keyIcon from "../../assets/icons/key.svg";

const WalletHeader = ({
  address,
  balance,
  isCopied,
  setIsCopied,
  copyToClipboard,
  handleDialogToggle,
}) => (
  <div className="p-4">
    <div className="space-x-4 items-center">
      <div>
        <div className="flex justify-between">
          <Typography variant="h5" color="black">
            Wallet Address
          </Typography>
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
                color="white"
                variant="text"
                onClick={() => handleDialogToggle("pkOpen")}
              >
                <img src={keyIcon} alt="key" className="w-5 h-5" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Typography variant="h6" className="text-gray-700 font-medium">
          {`${address}`}
        </Typography>
        <Typography variant="h6" className="font-medium text-gray-700">
          {balance !== null
            ? "Balance: $" + balance
            : "Click the get balance btn"}
        </Typography>
      </div>
    </div>
  </div>
);

export default WalletHeader;
