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
    basicInfo.projectImage ? URL.createObjectURL(basicInfo.projectImage) : "",
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
            : "File size exceeds 1MB.",
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
    <d>
      <p className="text-gray-600">
        Please enter required explanations for your project
      </p>
      <div className="mt-4 flex justify-start">
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
          <p className="mt-2 text-red-600">Please enter project name</p>
        )}
      </div>
      <div className="mt-5 flex justify-start">
        <Typography variant="h3">Project Price</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="mt-2 text-gray-600">
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
        <p className="mt-2 text-red-600">Please enter project price</p>
      )}
      <div className="mt-4 flex justify-start">
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
        <ul className="ml-2 mt-2 list-inside list-disc text-white">
          <li>Smaller than 1MB</li>
          <li>File format must be png or jpg</li>
        </ul>
      </Alert>
      <div className="file-upload relative mt-2 rounded-md border border-gray-400">
        {imagePreview ? (
          <div className="h-full w-full">
            <img
              src={imagePreview}
              alt="uploaded"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-0 top-0 flex p-2">
              <Button
                className="flex h-10 w-10 flex-col place-content-center items-center rounded-sm bg-white p-1 shadow-lg hover:bg-gray-200"
                onClick={handleImageDelete}
              >
                <FiTrash2 className="w-28 text-gray-700" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <img src={imageIcon} alt="upload" className="w-16" />
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
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            />
          </>
        )}
      </div>

      {imageError && <p className="mt-2 text-red-600">{imageError}</p>}
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
    </d>
  );
};

export default BasicInfo;
