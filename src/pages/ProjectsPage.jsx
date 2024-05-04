import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import StickyNavbar from "../components/ui/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";

const ProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <Typography variant="h2">
          <div className="mt-16 mx-48 px-4">My Projects</div>
        </Typography>
        <div className="mt-5 py-6 bg-gradient-to-bl from-gray-100 via-pink-200 to-purple-300 border border-gray-50 border-s-0 border-e-0">
          <div className="mx-48 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <EcommerceCard
                title={"Project title"}
                description={"In progress"}
                instruction={"Continue create project"}
                onClick={() => navigate("/createproject")}
              />
              <EcommerceCard
                title={"Project title"}
                description={"In progress"}
                instruction={"Continue create project"}
                onClick={() => navigate("/createproject")}
              />
              <EcommerceCard
                title={"Project title"}
                description={"In progress"}
                instruction={"Continue create project"}
                onClick={() => navigate("/createproject")}
              />
              <EcommerceCard
                title={"Project title"}
                description={"In progress"}
                instruction={"Continue create project"}
                onClick={() => navigate("/createproject")}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 mx-40 px-4 ">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </div>
  );
};

export default ProjectsPage;
