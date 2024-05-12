import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StickyNavbar from "../components/ui/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import { API } from "../config";

const ProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(API.READPROJECT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching projects", error);
      });
  }, []);

  const createProjectHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API.INITPROJECT}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const projectId = response.data.data;
      navigate(`/createproject/${projectId}`);
    } catch (error) {
      console.log("Error Creating Project:", error);
    }
  };

  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="mt-16 mx-48 px-4 flex justify-start">
          <Typography variant="h2">My Projects</Typography>
          <Button
            className="ml-4 bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
            onClick={createProjectHandler}
          >
            Create Project
          </Button>
        </div>
        <div className="mt-5 py-6 bg-gradient-to-bl from-gray-100 via-pink-200 to-purple-300 border border-gray-50 border-s-0 border-e-0">
          <div className="mx-48 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {projects.map((project, idx) => {
                const today = new Date();
                const projectTimeLine = new Date(project.deadLine);

                return (
                  <EcommerceCard
                    key={idx}
                    title={project.title}
                    description={
                      today > projectTimeLine ? "Funding on progress" : "Closed"
                    }
                    instruction={today > projectTimeLine}
                    thumbnail={project.thumbnail}
                    onClick={() => navigate("/createproject")}
                  />
                );
              })}
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
