import React, { useState } from "react";
import {
  DialogHeader,
  DialogBody,
  Typography,
  Dialog,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import AvatarDefault from "../ui/AvatarDefault";
import copyIcon from "../../assets/icons/copy.svg";
import keyIcon from "../../assets/icons/key.svg";
import ListWithAvatar from "../ui/ListWithAvatar";

const WalletMain = ({ setPage, address }) => {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const prKey = localStorage.getItem("private_key");

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`${text} copied to clipboard`);
      })
      .catch((error) => {
        console.error("Failed to copy address: ", error);
      });
    setIsCopied(true);
  };
  return (
    <>
      <DialogHeader className="justify-between p-3">
        <div className="space-x-4 flex items-center justify-between">
          <AvatarDefault />
          <div>
            <Typography variant="h5" color="purple">
              Address
            </Typography>
            <Typography variant="small" color="white">
              {`${address}`}
            </Typography>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <Tooltip
            content={isCopied ? "Copied" : "Copy address"}
            className="z-[10000] bg-purple-700"
          >
            <IconButton
              variant="text"
              color="white"
              onClick={() => copyToClipboard(address)}
              onMouseLeave={() => setIsCopied(false)}
            >
              <img src={copyIcon} alt="copy" className="w-5 h-5" />
            </IconButton>
          </Tooltip>

          <Tooltip
            content={isCopied ? "Copied" : "Copy private key"}
            className="z-[10000] bg-purple-700"
          >
            <IconButton
              color="white"
              variant="text"
              onClick={() => copyToClipboard(prKey)}
              onMouseLeave={() => setIsCopied(false)}
            >
              <img src={keyIcon} alt="key" className="w-5 h-5" />
            </IconButton>
          </Tooltip>
        </div>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll px-3 pb-0 ">
        <div className="flex justify-between items-center">
          <Typography
            variant="paragraph"
            color="white"
            className=" font-bold text-2xl"
          >
            $16543.12
          </Typography>
          <div className="flex space-x-2">
            <button
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
              onClick={handleOpen}
            >
              Buy
            </button>

            <button
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
              onClick={() => setPage(1)}
            >
              Swap
            </button>
          </div>
        </div>
        <hr className="bg-gray-300 mt-3" />
      </DialogBody>
      <DialogBody className="overflow-y-scroll w-full">
        <p className="text-xl text-white font-bold mb-2">Tickets</p>
        <ListWithAvatar />
      </DialogBody>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader className="p-2 justify-center">
          Do you want to get token?
        </DialogHeader>
        <div className="flex justify-center">
          <DialogBody className="p-2">
            <p className="justify-center px-2">Free charge left: 2</p>
            <div className="flex space-x-2">
              <button className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10">
                Yes
              </button>
              <button
                className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                onClick={() => handleOpen()}
              >
                No
              </button>
            </div>
          </DialogBody>
        </div>
      </Dialog>
    </>
  );
};

export default WalletMain;
