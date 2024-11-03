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
        },
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
    <div className="flex justify-between">
      <div className="w-1/2">
        <MembershipBg />
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Card title={"Create wallet to use our service"} width={"w-[500px]"}>
          <AccordionCustomStyles />
          <div className="mb-2 mt-2 rounded-lg border border-blue-gray-100 p-2">
            {showMnemonic ? (
              <>
                <div
                  role="alert"
                  className="font-regular relative m-0 flex w-full rounded-lg border border-red-500 px-4 py-4 text-base text-red-700"
                  style={{ opacity: 1 }}
                >
                  <span>
                    If you lose your secret recovery phrase, you may lose access
                    to your wallet. Itemize cannot recover it, and you are
                    solely responsible for managing it.
                  </span>
                </div>

                <div className="mt-2">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {mnemonic.map((word, index) => (
                      <div key={index} className="m-2 flex justify-start">
                        <p className="text-purple-600">
                          {index + 1}&nbsp;&nbsp;
                        </p>
                        <p>{word}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-2 flex items-center justify-center gap-3 border border-purple-600 bg-white !normal-case text-purple-600 hover:bg-purple-600 hover:text-white"
                    fullWidth
                    onClick={downloadMnemonic}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
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
                    className="mt-2 bg-purple-600 !normal-case"
                    fullWidth
                  >
                    Go home to use service
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Button onClick={mnemonicHandler} className="bg-purple-700">
                  <div className="flex items-center justify-center">
                    <img src={seeIcon} className="mr-3 w-4"></img>
                    <p>Show mnemonic phrase</p>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
