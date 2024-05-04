import { Typography, Input, Alert, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import "./styles.css";
import imageIcon from "../../assets/icons/image.svg";

const BasicInfo = ({ basicInfo, setProject }) => {
  const [basicInfoForm, setBasicInfoForm] = useState({
    projectName: basicInfo.projectName,
    projectImage: basicInfo.projectImage,
  });
  const [inputValidity, setInputValidity] = useState({
    projectName: true,
    projectImage: true,
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setBasicInfoForm((prevProject) => ({
      ...prevProject,
      projectImage: file,
    }));
  };
  const validateAndSave = () => {
    const isValidProjectName = basicInfoForm.projectName !== "";
    const isValidProjectImage = basicInfoForm.projectImage !== "";

    setInputValidity({
      projectName: isValidProjectName,
      projectImage: isValidProjectImage,
    });

    if (isValidProjectName && isValidProjectImage) {
      handleSave();
    }
  };
  const handleSave = () => {
    setProject((prevProject) => ({
      ...prevProject,
      basicInfo: basicInfoForm,
    }));
  };
  return (
    <>
      <p className="text-gray-600">
        Please enter required explanations for your project
      </p>
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Project Name</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <div className="mt-2">
        <Input
          size="lg"
          label="Please enter your project's name"
          value={basicInfoForm.projectName}
          onChange={(event) =>
            setBasicInfoForm((prevProject) => ({
              ...prevProject,
              projectName: event.target.value,
            }))
          }
        ></Input>
        {!inputValidity.projectName && (
          <p className="text-red-600 mt-2">Please enter project name</p>
        )}
      </div>
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Representative Image</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">
        Please register the image that best describes your project
      </p>
      <Alert
        variant="ghost"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        }
        className="mt-2 bg-purple-700"
      >
        <Typography className="font-medium text-white">
          Ensure that these requirements are met:
        </Typography>
        <ul className="mt-2 ml-2 list-inside list-disc text-white">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
      <div className="file-upload mt-2 border border-dashed border-gray-700 rounded-md ">
        <div className="flex justify-center">
          <img src={imageIcon} alt="upload" className="w-16 " />
        </div>
        <h3>{`${
          basicInfoForm.projectImage
            ? basicInfoForm.projectImage.name
            : "Click box to upload"
        }`}</h3>
        <p>Maximun file size 10mb</p>
        <input type="file" onChange={handleImageChange} />
      </div>
      {!inputValidity.projectImage && (
        <p className="text-red-600 mt-2">Please upload project image</p>
      )}
      <div className="mt-4">
        <Button
          size="md"
          className="w-24"
          onClick={() => {
            validateAndSave();
          }}
        >
          save
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
