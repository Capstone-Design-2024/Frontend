import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import AccordionCustomStyles from "../components/ui/AccordianCustomStyles";
import { Button } from "@material-tailwind/react";
import { API } from "../config";
import axios from "axios";
import seeIcon from "../assets/icons/see.svg";
import { loginSuccess } from "../actions/authActions";
import { useDispatch } from "react-redux";

const LogInPage = () => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [mnemonic, setMnemonic] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMnemonic(mnemonicResponse.data.mnemonic.split(" "));
      localStorage.setItem("private_key", mnemonicResponse.data.private_key);
    } catch (error) {
      console.error("Error occurred during generating wallet:", error);
    }
  };
  const downloadMnemonic = () => {
    const element = document.createElement("a");
    const file = new Blob([mnemonic.join(" ")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "mnemonic.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const goHome = () => {
    navigate("/");
    dispatch(loginSuccess());
  };

  return (
    <MembershipBg type={"Create Wallet"} padding={"lg:px-14"}>
      <Card title={"Create wallet to use our service"} width={"w-[500px]"}>
        <AccordionCustomStyles />
        <div className="mb-2 rounded-lg border border-blue-gray-100 mt-2 p-2">
          {showMnemonic ? (
            <>
              <div
                role="alert"
                className="relative  w-full text-base font-regular px-4 py-4 rounded-lg border border-red-500 text-red-700 m-0 flex"
                style={{ opacity: 1 }}
              >
                <span>
                  If you lose your secret recovery phrase, you may lose access
                  to your wallet. Itemize cannot recover it, and you are solely
                  responsible for managing it.
                </span>
              </div>

              <div className="mt-2 ">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {mnemonic.map((word, index) => (
                    <div key={index} className="m-2 flex justify-start">
                      <p className="text-purple-600">{index + 1}&nbsp;&nbsp;</p>
                      <p>{word}</p>
                    </div>
                  ))}
                </div>
                <Button
                  className="!normal-case flex justify-center items-center gap-3 mt-2  hover:bg-purple-600 bg-white border border-purple-600 text-purple-600 hover:text-white"
                  fullWidth
                  onClick={downloadMnemonic}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                  </svg>
                  Download Mnemonic Phrases
                </Button>
                <Button
                  onClick={goHome}
                  className="!normal-case mt-2 bg-purple-600"
                  fullWidth
                >
                  Go home to use service
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Button onClick={mnemonicHandler} className="bg-purple-700">
                <div className="flex justify-center items-center">
                  <img src={seeIcon} className="w-4 mr-3"></img>
                  <p>Show mnemonic phrase</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </MembershipBg>
  );
};

export default LogInPage;
