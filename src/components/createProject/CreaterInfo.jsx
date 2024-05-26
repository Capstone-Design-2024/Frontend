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
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Creater Name</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">Please enter your name</p>
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
        <p className="text-red-600 mt-2">Please enter your name</p>
      )}
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Creater Email</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">Please enter your email</p>
      <div className="mt-2">
        <Input
          label="email"
          type="email"
          size="md"
          value={createrInfoForm.createrEmail}
          onChange={(event) =>
            setCreaterInfoForm((prevProject) => ({
              ...prevProject,
              createrEmail: event.target.value,
            }))
          }
        ></Input>
      </div>
      {!inputValidity.createrEmail && (
        <p className="text-red-600 mt-2">Please enter your email</p>
      )}
      <div className="flex justify-start mt-4">
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
        <p className="text-red-600 mt-2">Please enter your phone number</p>
      )}
      <div className="mt-4">
        <Button
          variant="text"
          size="md"
          className="w-24 !normal-case text-sm mt-1 bg-white text-gray-700 border border-gray-200 shadow-lg shadow-gray-900/5"
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
