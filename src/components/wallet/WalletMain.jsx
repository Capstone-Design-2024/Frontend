import React, { useState, useMemo, useCallback, useEffect } from "react";
import { DialogBody, Button, Typography } from "@material-tailwind/react";
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
  const [ownedTicket, setOwnedTicket] = useState([]);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [noTickets, setNoTickets] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const prKey = useMemo(() => localStorage.getItem("private_key"), []);
  const storedPassword = useMemo(() => localStorage.getItem("pw"), []);
  const jwt = localStorage.getItem("token");

  const handleDialogToggle = useCallback(
    (key) => setDialogState((prev) => ({ ...prev, [key]: !prev[key] })),
    [],
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
    if (!address) {
      console.error("Address is null or undefined");
      return;
    }

    try {
      console.log("Fetching balance...");
      const erc20Contract = await ERC20Contract.getInstance();
      const result = await erc20Contract.balanceOf(address);
      console.log("Fetched balance:", result);
      setBalance(result);
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      getBalance();
    }
  }, [address, getBalance]);

  const chargeBalance = async () => {
    console.log("PPT 발행을 시작합니다. 응답이 오기 전까지 기다려주세요.");
    setLoading(true);
    try {
      await axios.post(
        `${API.CHARGEPNPTOKEN}`,
        { wallet_address: address },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
    } catch (error) {
      console.error("Failed to charge balance:", error);
    } finally {
      setLoading(false);
      if (address) {
        await getBalance();
      }
      setFreeChargeLeft((cur) => cur - 1);
      handleDialogToggle("open");
    }
  };

  const fetchTicket = async () => {
    try {
      const erc20Contract = await ERC20Contract.getInstance();
      const result = await erc20Contract.getUserProjects(prKey);
      const cards = [];

      if (!result) {
        setNoTickets(true);
        setTicketLoading(false);
        return;
      }

      for await (const pid of result.split(",")) {
        const tokenURI = await erc20Contract.getTokenURI(parseInt(pid));
        const data = { tokenURI: tokenURI };

        const response = await axios.post(`${API.TOKENRESOLVE}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        const responseData = response.data.data;

        const ipfsGatewayUrl = responseData.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/",
        );

        const cardData = {
          name: responseData.name,
          image: ipfsGatewayUrl,
          description: responseData.description,
          price: responseData.attributes[0]["value"],
          uri: tokenURI,
        };

        cards.push(cardData);
      }
      setOwnedTicket(cards);
      setTicketLoading(false);
      setNoTickets(cards.length === 0);
    } catch (error) {
      console.error("Error fetching project cards:", error);
      setFetchError(true);
      setTicketLoading(false);
    }
    try {
      const response = await axios.get(`${API.CHECKBALANCE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      setOwnedTicket((prevTickets) => [...prevTickets, ...response.data.data]);
    } catch (error) {
      console.log("Error fetching traded ticket: ", error);
    }
  };

  useEffect(() => {
    fetchTicket();
    console.log(ownedTicket);
  }, []);

  return (
    <>
      <div className="rounded-t-lg bg-white p-4">
        <WalletHeader
          address={address}
          balance={balance}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
          copyToClipboard={copyToClipboard}
          handleDialogToggle={handleDialogToggle}
          setPage={setPage}
        />
      </div>
      <div className="px-4">
        <DialogBody>
          <ListWithAvatar ticket={ownedTicket} loading={ticketLoading}>
            {noTickets && (
              <Typography variant="small" color="gray" className="pl-4">
                You don't have any tickets yet!
              </Typography>
            )}
            {fetchError && (
              <>
                <Typography variant="small" color="red" className="pl-4">
                  Error fetching tickets. Would you like to try again?
                </Typography>
                <Button
                  onClick={() => {
                    setFetchError(false);
                    setTicketLoading(true);
                    fetchTicket();
                  }}
                  color="blue"
                  className="ml-4 mt-2"
                >
                  Retry
                </Button>
              </>
            )}
          </ListWithAvatar>
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
