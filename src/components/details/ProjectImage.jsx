import React from "react";

const ProjectImage = ({ thumbnail }) => {
  return (
    <img
      src={thumbnail}
      alt="Product"
      className="w-full h-full rounded-lg  object-contain"
    />
  );
};

export default ProjectImage;
