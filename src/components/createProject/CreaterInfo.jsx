import React, { useState } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { BsAsterisk } from "react-icons/bs";

const CreaterInfo = ({
  createrInfo,
  setProject,
  setCurrent,
  setButtonAvailability,
}) => {
  const [createrInfoForm, setCreaterInfoForm] = useState({
    createrName: createrInfo.createrName,
    createrEmail: createrInfo.createrEmail,
    createrPhoneNumber: createrInfo.createrPhoneNumber,
  });
  const [inputValidity, setInputValidity] = useState({
    createrName: true,
    createrEmail: true,
    createrPhoneNumber: true,
  });
  const validateAndSave = () => {
    const isValidCreaterName = createrInfoForm.createrName !== "";
    const isValidCreaterEmail = createrInfoForm.createrEmail !== "";
    const isValidCreaterPhoneNumber = createrInfoForm.createrPhoneNumber !== "";
    setInputValidity({
      createrName: isValidCreaterName,
      createrEmail: isValidCreaterEmail,
      createrPhoneNumber: isValidCreaterPhoneNumber,
    });
    if (
      isValidCreaterName &&
      isValidCreaterEmail &&
      isValidCreaterPhoneNumber
    ) {
      handleSave();
      setCurrent("Creater Information");
      setButtonAvailability(false);
    }
  };
  const handleSave = () => {
    setProject((prevProject) => ({
      ...prevProject,
      createrInfo: createrInfoForm,
    }));
  };
  return (
    <>
      <div className="mt-4 flex justify-start">
        <Typography variant="h3">Creater Name</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <div className="mt-2">
        <Input
          label="name"
          size="md"
          value={createrInfoForm.createrName}
          onChange={(event) =>
            setCreaterInfoForm((prevProject) => ({
              ...prevProject,
              createrName: event.target.value,
            }))
          }
        ></Input>
      </div>
      {!inputValidity.createrName && (
        <p className="mt-2 text-red-600">Please enter your name</p>
      )}
      <div className="mt-4 flex justify-start">
        <Typography variant="h3">Creater Email</Typography>
      </div>
      <div className="mt-2">
        <Input
          label="email"
          type="email"
          size="md"
          value={createrInfoForm.createrEmail}
          disabled
        ></Input>
      </div>
      {!inputValidity.createrEmail && (
        <p className="mt-2 text-red-600">Please enter your email</p>
      )}
      <div className="mt-4 flex justify-start">
        <Typography variant="h3">Creater Phone Number</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">Please enter your phone number</p>
      <div className="mt-2">
        <Input
          label="phone number"
          size="md"
          value={createrInfoForm.createrPhoneNumber}
          onChange={(event) =>
            setCreaterInfoForm((prevProject) => ({
              ...prevProject,
              createrPhoneNumber: event.target.value,
            }))
          }
        ></Input>
      </div>
      {!inputValidity.createrPhoneNumber && (
        <p className="mt-2 text-red-600">Please enter your phone number</p>
      )}
      <div className="mt-4">
        <Button
          variant="text"
          size="md"
          className="mt-1 w-24 border border-gray-200 bg-white text-sm !normal-case text-gray-700 shadow-lg shadow-gray-900/5"
          onClick={() => {
            validateAndSave();
          }}
        >
          next
        </Button>
      </div>
    </>
  );
};

export default CreaterInfo;
