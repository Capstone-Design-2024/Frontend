import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import chevron from "../../assets/icons/chevronDown.svg";
import Card from "../ui/Card";
import ProjectCategory from "./ProjectCategory";

const ProjectInfo = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const handleCategoryOpen = () => setIsCategoryOpen(!isCategoryOpen);
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
        <span>Please choose the category</span>
        <img src={chevron} alt="chevron down" color="#cccccc" className="w-6" />
      </button>
      {isCategoryOpen && (
        <ProjectCategory
          open={isCategoryOpen}
          handler={handleCategoryOpen}
        ></ProjectCategory>
      )}
    </>
  );
};

export default ProjectInfo;
