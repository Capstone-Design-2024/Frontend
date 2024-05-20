import React from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const ProjectDetailPage = () => {
  const location = useLocation();
  const { project } = location.state;

  return (
    <div className="min-h-screen p-6">
      <Typography variant="h2">{project.title}</Typography>
      <img src={project.thumbnail} alt={project.title} />
      <Typography variant="h3">{project.description}</Typography>
      {/* Display other project details as needed */}
    </div>
  );
};

export default ProjectDetailPage;
