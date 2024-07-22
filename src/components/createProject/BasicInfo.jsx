import { Typography, Input, Alert, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import "./styles.css";
import imageIcon from "../../assets/icons/image.svg";

const BasicInfo = ({ basicInfo, setProject, setCurrent, setAvailability }) => {
  const [basicInfoForm, setBasicInfoForm] = useState({
    projectName: basicInfo.projectName,
    projectImage: basicInfo.projectImage,
    projectPrice: basicInfo.projectPrice,
  });
  const [inputValidity, setInputValidity] = useState({
    projectName: true,
    projectImage: true,
    projectPrice: true,
  });
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(
    basicInfo.projectImage ? URL.createObjectURL(basicInfo.projectImage) : ""
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValidFormat =
        file.type === "image/png" || file.type === "image/jpeg";
      const isValidSize = file.size <= 1 * 1024 * 1024; // 1MB

      if (isValidFormat && isValidSize) {
        setBasicInfoForm((prevProject) => ({
          ...prevProject,
          projectImage: file,
        }));
        setImagePreview(URL.createObjectURL(file));
        setImageError("");
        setInputValidity((prevValidity) => ({
          ...prevValidity,
          projectImage: true,
        }));
      } else {
        setImageError(
          !isValidFormat
            ? "Invalid file format. Only PNG and JPG are allowed."
            : "File size exceeds 1MB."
        );
        setInputValidity((prevValidity) => ({
          ...prevValidity,
          projectImage: false,
        }));
      }
    }
  };

  const handleImageDelete = () => {
    setBasicInfoForm((prevProject) => ({
      ...prevProject,
      projectImage: "",
    }));
    setImagePreview("");
    setImageError("");
    setInputValidity((prevValidity) => ({
      ...prevValidity,
      projectImage: false,
    }));
  };

  const validateAndSave = () => {
    const isValidProjectName = basicInfoForm.projectName !== "";
    const isValidProjectImage = basicInfoForm.projectImage !== "";
    const isValidProjectPrice = basicInfoForm.projectPrice !== "";
    setInputValidity({
      projectName: isValidProjectName,
      projectImage: isValidProjectImage,
      projectPrice: isValidProjectPrice,
    });

    if (isValidProjectName && isValidProjectImage && isValidProjectPrice) {
      handleSave();
      setCurrent("Story Line");
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        storyLine: false,
      }));
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
      <div className="flex justify-start mt-5">
        <Typography variant="h3">Project Price</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600 mt-2">
        Please set your target funds between $500 to $1M.
      </p>
      <div className="mt-2">
        <Input
          size="lg"
          label="Target fund"
          value={basicInfoForm.projectPrice}
          type="number"
          icon={<i>$</i>}
          onChange={(event) =>
            setBasicInfoForm((prevProject) => ({
              ...prevProject,
              projectPrice: event.target.value,
            }))
          }
        ></Input>
      </div>
      {!inputValidity.projectPrice && (
        <p className="text-red-600 mt-2">Please enter project price</p>
      )}
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
          <li>Smaller than 1MB</li>
          <li>File format must be png or jpg</li>
        </ul>
      </Alert>
      <div className="file-upload mt-2 border border-gray-400 rounded-md relative">
        {imagePreview ? (
          <div className="w-full h-full">
            <img
              src={imagePreview}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 flex p-2">
              <Button
                className="bg-white hover:bg-gray-200 w-10 h-10 p-1 rounded-sm shadow-lg flex flex-col items-center place-content-center"
                onClick={handleImageDelete}
              >
                <FiTrash2 className="text-gray-700 w-28" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <img src={imageIcon} alt="upload" className="w-16 " />
            </div>
            <h3>{`${
              basicInfoForm.projectImage
                ? basicInfoForm.projectImage.name
                : "Click box to upload"
            }`}</h3>
            <p>Maximum file size 1MB</p>
            <input
              type="file"
              onChange={handleImageChange}
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
            />
          </>
        )}
      </div>

      {imageError && <p className="text-red-600 mt-2">{imageError}</p>}
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

export default BasicInfo;
