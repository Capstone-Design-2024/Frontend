import React, { useState, useMemo, useCallback } from "react";
import { DialogBody, Button } from "@material-tailwind/react";
import { API } from "../../config";
import axios from "axios";
import WalletHeader from "./WalletHeader";
import PrivateKeyDialog from "./PrivateKeyDialog";
import ChargeDialog from "./ChargeDialog";
import ListWithAvatar from "../ui/ListWithAvatar";
import ERC20Contract from "../../contract/ERC20Contract";

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

  const getBalance = useCallback(async () => {
    try {
      console.log("get balance function");
      const erc20Contract = await ERC20Contract.getInstance();
      console.log(address);
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
      <div className="bg-white rounded-t-lg p-4 shadow-xl">
        <WalletHeader
          address={address}
          balance={balance}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
          copyToClipboard={copyToClipboard}
          handleDialogToggle={handleDialogToggle}
        >
          <div className="flex space-x-2">
            <Button
              variant="text"
              size="sm"
              className="shadow-xl bg-black hidden !normal-case lg:inline-block text-white hover:bg-black/80 "
              onClick={() => handleDialogToggle("open")}
            >
              Charge
            </Button>
            <Button
              variant="text"
              size="sm"
              className="shadow-xl bg-black hidden !normal-case lg:inline-block  text-white hover:bg-black/80"
              onClick={() => setPage(1)}
            >
              Swap
            </Button>
            <Button
              variant="text"
              size="sm"
              className="shadow-xl bg-black hidden !normal-case lg:inline-block  text-white hover:bg-black/80"
              onClick={() => getBalance()}
            >
              Get Balance
            </Button>
          </div>
        </WalletHeader>
      </div>
      <div className="px-4">
        <DialogBody>
          <ListWithAvatar walletAddress={address} />
        </DialogBody>
      </div>
      <ChargeDialog
        open={dialogState.open}
        handleDialogToggle={handleDialogToggle}
        chargeBalance={chargeBalance}
        loading={loading}
        freeChargeLeft={freeChargeLeft}
      />
      <PrivateKeyDialog
        open={dialogState.pkOpen}
        handleDialogToggle={handleDialogToggle}
        validatePassword={validatePassword}
        showPrivateKey={showPrivateKey}
        prKey={prKey}
        isCopied={isCopied}
        copyToClipboard={copyToClipboard}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
      />
    </>
  );
};

export default WalletMain;
