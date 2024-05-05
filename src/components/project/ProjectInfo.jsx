import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import chevron from "../../assets/icons/chevronDown.svg";
import ProjectCategory from "./ProjectCategory";
import DatePicker from "../ui/DatePicker";

const ProjectInfo = ({
  projectInfo,
  setProject,
  setCurrent,
  setAvailability,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [projectInfoForm, setProjectInfoForm] = useState({
    category: projectInfo.category,
    targetFund: projectInfo.targetFund,
    dueDate: projectInfo.dueDate,
  });
  const [inputValidity, setInputValidity] = useState({
    category: true,
    targetFund: true,
    dueDate: true,
  });

  const handleCategoryOpen = () => setIsCategoryOpen(!isCategoryOpen);
  const handleCategory = (cat) => {
    handleCategoryOpen();
    setProjectInfoForm((prevProject) => ({
      ...prevProject,
      category: cat,
    }));
  };
  const validateAndSave = () => {
    const isValidCategory =
      projectInfoForm.category !== "Please choose the category";
    const isValidTargetFund = projectInfoForm.targetFund !== "";
    const isValidDueDate = projectInfoForm.dueDate !== "";

    setInputValidity({
      category: isValidCategory,
      targetFund: isValidTargetFund,
      dueDate: isValidDueDate,
    });

    if (isValidCategory && isValidTargetFund && isValidDueDate) {
      handleSave();
      setCurrent("Basic Information");
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        basicInfo: false,
      }));
    }
  };

  const handleSave = () => {
    setProject((prevProject) => ({
      ...prevProject,
      projectInfo: projectInfoForm,
    }));
  };

  return (
    <>
      <div className="flex justify-start">
        <Typography variant="h3">Category</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600 mt-2">
        Please choose the category so that users can find your product easily.
      </p>
      <button
        onClick={handleCategoryOpen}
        className="mt-2 relative w-full px-8 py-4 flex justify-between text-base text-gray-900 border border-gray-300 rounded-lg font-regular hover:border-purple-700"
      >
        <span>{projectInfoForm.category}</span>
        <img src={chevron} alt="chevron down" color="#cccccc" className="w-6" />
      </button>
      {!inputValidity.category && (
        <p className="text-red-600 mt-2">Please choose the category</p>
      )}
      {isCategoryOpen && (
        <ProjectCategory
          open={isCategoryOpen}
          handler={handleCategoryOpen}
          setCategory={handleCategory}
        ></ProjectCategory>
      )}
      <div className="flex justify-start mt-5">
        <Typography variant="h3">Target Funds</Typography>
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
          label="Please enter your target fund"
          value={projectInfoForm.targetFund}
          icon={<i>$</i>}
          onChange={(event) =>
            setProjectInfoForm((prevProject) => ({
              ...prevProject,
              targetFund: event.target.value,
            }))
          }
        ></Input>
      </div>
      {!inputValidity.targetFund && (
        <p className="mt-2 text-red-700">Please enter your target fund</p>
      )}
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Due date</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">
        Please register the end date of the funding
      </p>
      <DatePicker
        curDate={projectInfoForm.dueDate}
        setCurDate={setProjectInfoForm}
      ></DatePicker>
      {!inputValidity.dueDate && (
        <p className="mt-2 text-red-700">Please enter your due date</p>
      )}
      <div className="mt-4">
        <Button
          size="md"
          className="w-24"
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

export default ProjectInfo;
