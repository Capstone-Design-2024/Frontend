import React, { useState, useMemo, useCallback } from "react";
import {
  DialogHeader,
  DialogBody,
  Typography,
  Dialog,
  IconButton,
  Tooltip,
  Input,
  Spinner,
  Button,
} from "@material-tailwind/react";
import AvatarDefault from "../ui/AvatarDefault";
import copyIcon from "../../assets/icons/copy.svg";
import keyIcon from "../../assets/icons/key.svg";
import ListWithAvatar from "../ui/ListWithAvatar";
import { API } from "../../config";
import ERC20Contract from "../../contract/ERC20Contract";
import axios from "axios";

const WalletMain = ({ setPage, address, initialBalance }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    pkOpen: false,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [password, setPassword] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [balance, setBalance] = useState(initialBalance);
  const [token, setToken] = useState("Click the contract button");
  const [loading, setLoading] = useState(false);
  const [freeChargeLeft, setFreeChargeLeft] = useState(2);

  const prKey = useMemo(() => localStorage.getItem("private_key"), []);
  const storedPassword = useMemo(() => localStorage.getItem("pw"), []);

  const jwt = localStorage.getItem("token");

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

  const getInitialSupplyAmount = async () => {
    const erc20Contract = await ERC20Contract.getInstance();
    const result = await erc20Contract.initialSupply();

    setToken("ERC20 PPT initial supply amount is: " + result);
    console.log(result);
  };

  const getBalance = useCallback(async () => {
    try {
      const erc20Contract = await ERC20Contract.getInstance();
      const result = await erc20Contract.balanceOf(address);
      console.log(result);
      setBalance(result);
      handleDialogToggle("balanceOpen");
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  }, [address, handleDialogToggle]);

  const chargeBalance = async () => {
    console.log("PPT 발행을 시작합니다. 응답이 오기 전까지 기다려주세요.");
    setLoading(true);
    try {
      const response = await axios.post(
        `${API.CHARGEPNPTOKEN}`,
        { wallet_address: address },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to charge balance:", error);
    } finally {
      setLoading(false);
      getBalance();
      setFreeChargeLeft((cur) => cur - 1);
      handleDialogToggle("open");
    }
    return;
  };

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
            className="font-bold text-m"
          >
            {balance !== null ? "$" + balance : "Click the get balance btn"}
          </Typography>
          <div className="flex space-x-2">
            <Button
              size="xs"
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white !normal-case"
              onClick={() => handleDialogToggle("open")}
            >
              Charge
            </Button>
            <Button
              size="xs"
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white !normal-case"
              onClick={() => setPage(1)}
            >
              Swap
            </Button>
            <Button
              size="xs"
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white !normal-case"
              onClick={() => getInitialSupplyAmount()}
            >
              Contract
            </Button>
            <Button
              size="xs"
              className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white !normal-case"
              onClick={() => getBalance()}
            >
              Get Balance
            </Button>
          </div>
        </div>
        <Typography
          variant="paragraph"
          color="white"
          className="font-bold text-m"
        >
          {token !== null ? token : "Click the contract button"}
        </Typography>
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
            <p className="justify-center px-2">
              {loading ? "Charging..." : `Free charge left: ${freeChargeLeft}`}
            </p>
            <div className="flex space-x-2 justify-center">
              {loading ? (
                <div className="mt-2">
                  <Spinner color="purple" className="h-10 w-10" />
                </div>
              ) : (
                <>
                  <button
                    className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                    onClick={chargeBalance}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                    onClick={() => handleDialogToggle("open")}
                  >
                    Cancel
                  </button>
                </>
              )}
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
