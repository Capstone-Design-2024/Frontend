import React, { useState, useMemo, useCallback } from "react";
import {
  DialogHeader,
  DialogBody,
  Typography,
  Dialog,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import AvatarDefault from "../ui/AvatarDefault";
import copyIcon from "../../assets/icons/copy.svg";
import keyIcon from "../../assets/icons/key.svg";
import ListWithAvatar from "../ui/ListWithAvatar";

const WalletMain = ({ setPage, address }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    pkOpen: false,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [password, setPassword] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const prKey = useMemo(() => localStorage.getItem("private_key"), []);
  const storedPassword = useMemo(() => localStorage.getItem("pw"), []);

  const handleDialogToggle = useCallback(
    (key) => setDialogState((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`${text} copied to clipboard`);
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy address: ", error);
      });
  }, []);

  const validatePassword = useCallback(() => {
    if (password === storedPassword) {
      setShowPrivateKey(true);
      setPasswordError("");
    } else {
      setShowPrivateKey(false);
      setPasswordError("Incorrect password");
    }
  }, [password, storedPassword]);

  return (
    <>
      <DialogHeader className="justify-between p-3">
        <div className="space-x-4 flex items-center justify-between">
          <AvatarDefault />
          <div>
            <Typography variant="h5" color="purple">
              Wallet Address
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
            content={"Show private key"}
            className="z-[10000] bg-purple-700"
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
      </DialogHeader>
      <DialogBody className="overflow-y-scroll px-3 pb-0 ">
        <div className="flex justify-between items-center">
          <Typography
            variant="paragraph"
            color="white"
            className="font-bold text-2xl"
          >
            $16543.12
          </Typography>
          <div className="flex space-x-2">
            <button
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
              onClick={() => handleDialogToggle("open")}
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
      <Dialog
        open={dialogState.open}
        handler={() => handleDialogToggle("open")}
        size="xs"
      >
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
                onClick={() => handleDialogToggle("open")}
              >
                Cancel
              </button>
            </div>
          </DialogBody>
        </div>
      </Dialog>
      <Dialog
        open={dialogState.pkOpen}
        handler={() => handleDialogToggle("pkOpen")}
        size="sm"
      >
        <div className="p-4">
          <DialogHeader>
            Please enter your password to see your private key
          </DialogHeader>
          {showPrivateKey && (
            <div className="flex justify-between">
              <div className="px-4">
                <Typography>Your private key is: </Typography>
                <Typography variant="small" className="text-purple-700">
                  {prKey}
                </Typography>
              </div>
              <Tooltip
                content={isCopied ? "Copied" : "Copy address"}
                className="z-[10001] bg-purple-700"
              >
                <IconButton
                  variant="text"
                  onClick={() => copyToClipboard(prKey)}
                  onMouseLeave={() => setIsCopied(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#6c2dc7"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </div>
          )}
          <div className="p-3">
            <Input
              label="Password"
              type="password"
              size="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <Typography variant="small" color="red" className="mt-2">
                {passwordError}
              </Typography>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <DialogBody className="p-2">
            <div className="flex space-x-2">
              <button
                className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                onClick={validatePassword}
              >
                Show
              </button>
              <button
                className="bg-white hover:bg-red-600 text-red-600 border border-red-600 rounded-lg px-3 hover:text-white text-sm w-16 h-10"
                onClick={() => handleDialogToggle("pkOpen")}
              >
                Cancel
              </button>
            </div>
          </DialogBody>
        </div>
      </Dialog>
    </>
  );
};

export default WalletMain;
