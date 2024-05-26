import React, { useState } from "react";
import { Textarea, Typography, Button } from "@material-tailwind/react";
import { BsAsterisk } from "react-icons/bs";

const StoryLine = ({ storyLine, setProject, setCurrent, setAvailability }) => {
  const [storyLineForm, setStoryLineForm] = useState({
    projectDescription: storyLine.projectDescription,
  });
  const [inputValidity, setInputValidity] = useState({
    projectDescription: true,
  });
  const validateAndSave = () => {
    const isValidProjectDescription = storyLineForm.projectDescription !== "";
    setInputValidity({
      projectDescription: isValidProjectDescription,
    });
    if (isValidProjectDescription) {
      handleSave();
      setCurrent("Creater Information");
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        createrInfo: false,
      }));
    }
  };
  const handleSave = () => {
    setProject((prevProject) => ({
      ...prevProject,
      storyLine: storyLineForm,
    }));
  };
  return (
    <>
      <p className="text-gray-600">
        Please enter required explanations for your project
      </p>
      <div className="flex justify-start mt-4">
        <Typography variant="h3">Project Description</Typography>
        <div className="pt-2">
          <BsAsterisk color="red" fontSize={"0.7rem"} />
        </div>
      </div>
      <p className="text-gray-600">Please briefly explain your project</p>
      <div className="mt-2 flex w-full">
        <Textarea
          size="lg"
          label="Project description"
          value={storyLineForm.projectDescription}
          onChange={(event) =>
            setStoryLineForm((prevProject) => ({
              ...prevProject,
              projectDescription: event.target.value,
            }))
          }
        ></Textarea>
      </div>
      {!inputValidity.projectDescription && (
        <p className="text-red-600 mt-2">
          Please enter your project explanation
        </p>
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

export default StoryLine;
