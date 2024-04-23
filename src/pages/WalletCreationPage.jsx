import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import AccordionCustomStyles from "../components/ui/AccordianCustomStyles";
import { Alert, Button } from "@material-tailwind/react";
import { API } from "../config";
import axios from "axios";

const LogInPage = () => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState([""]);

  const mnemonicHandler = async (e) => {
    e.preventDefault();
    setShowMnemonic(true);
    try {
      const token = localStorage.getItem("token");
      const mnemonicResponse = await axios.post(
        `${API.WALLETGENERATE}`,
        { mnemonic: "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(mnemonicResponse.data.mnemonic);
      setMnemonic(mnemonicResponse.data.mnemonic.split(" "));
    } catch (error) {
      console.error("Error occurred during generating wallet:", error);
    }
  };

  return (
    <MembershipBg type={"Create Wallet"} padding={"lg:px-14"}>
      <Card title={"Create wallet"} width={"w-[500px]"}>
        <AccordionCustomStyles />
        <div className="mb-2 rounded-lg border border-blue-gray-100 mt-2 p-2">
          {showMnemonic ? (
            <>
              <Alert variant="outlined" color="red">
                <span>Please make sure to keep these words.</span>
              </Alert>
              <div className="mt-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {mnemonic.map((word, index) => (
                    <div key={index} className="m-2 flex justify-center">
                      <p>{word}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Button onClick={mnemonicHandler}>Show mnemonics</Button>
            </div>
          )}
        </div>
      </Card>
    </MembershipBg>
  );
};

export default LogInPage;
