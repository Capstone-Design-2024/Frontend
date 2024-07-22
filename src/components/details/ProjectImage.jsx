import React from "react";

const ProjectImage = ({ thumbnail }) => {
  return (
    <img
      src={thumbnail}
      alt="Product"
      className="w-full h-[30rem] rounded-lg shadow-lg object-scale-down"
    />
  );
};

export default ProjectImage;
