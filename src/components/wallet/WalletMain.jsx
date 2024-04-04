import React, { useState } from "react";
import {
  DialogHeader,
  DialogBody,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import AvatarDefault from "../ui/AvatarDefault";
import copyIcon from "../../assets/copy.svg";

const WalletMain = ({ setPage }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <DialogHeader className="justify-between p-3">
        <div className="space-x-2 flex items-center">
          <AvatarDefault />
          <Typography variant="h6" color="white">
            Itemize.wallet.id
          </Typography>
        </div>
        <div>
          <img src={copyIcon} alt="copy" className="w-5 h-5" />
        </div>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll p-3">
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
      </DialogBody>
      <hr className="bg-gray-300 my-3" />
      <DialogBody className="overflow-y-scroll p-3">Tickets</DialogBody>
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
              <button className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10">
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
