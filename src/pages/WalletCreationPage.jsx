import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import AccordionCustomStyles from "../components/ui/AccordianCustomStyles";
import { Alert } from "@material-tailwind/react";

const LogInPage = () => {
  const requiredFields = [
    { type: "text", placeholder: "Email" },
    { type: "password", placeholder: "Password" },
  ];
  const navigate = useNavigate();

  const mnemonicSamples = [
    "school",
    "creek",
    "list",
    "royal",
    "simple",
    "school",
    "creek",
    "list",
    "royal",
    "simple",
    "school",
    "creek",
    "list",
    "royal",
    "simple",
    "school",
    "creek",
    "list",
    "royal",
    "simple",
    "creek",
    "list",
    "royal",
    "simple",
  ];

  return (
    <MembershipBg type={"Create Wallet"} padding={"lg:px-14"}>
      <Card title={"Create wallet"} width={"w-[500px]"}>
        <AccordionCustomStyles />
        <div className="mb-2 rounded-lg border border-blue-gray-100 mt-2 p-2">
          <Alert variant="outlined" color="red">
            <span>Please make sure to keep these words.</span>
          </Alert>
          <div className="mt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {mnemonicSamples.map((word, index) => (
                <div key={index} className="m-2 flex justify-center">
                  <p>{word}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </MembershipBg>
  );
};

export default LogInPage;
