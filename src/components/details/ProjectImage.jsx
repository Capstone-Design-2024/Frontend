import React from "react";

const ProjectImage = ({ thumbnail }) => {
  return (
    <img
      src={thumbnail}
      alt="Product"
      className="w-8/12 h-96 rounded-lg shadow-lg object-scale-down"
    />
  );
};

export default ProjectImage;
