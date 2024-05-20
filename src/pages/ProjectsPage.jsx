import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, Typography, Card } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import { API } from "../config";

const ProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  console.log(projects);

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
  }, [token]);

  const createProjectHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
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
        </div>
        <div className="mt-5 py-6 bg-gradient-to-bl from-gray-100 via-pink-200 to-purple-300 border border-gray-50 border-s-0 border-e-0 min-h-96">
          <div className="mx-48 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <Card className="xl:w-63 m-3 min-w-[211px] h-[419px]  bg-white bg-opacity-10 place-content-center">
                <Button
                  onClick={createProjectHandler}
                  className="bg-transparent border border-purple-600 border-dashed shadow-none w-full h-full !normal-case text-lg text-purple-700 flex flex-col items-center justify-center hover:bg-white hover:border-purple-700 hover:border-solid"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Click to create project</span>
                  </div>
                </Button>
              </Card>

              {projects.map((project, idx) => {
                const today = new Date();
                const projectTimeLine = new Date(project.deadLine);
                return (
                  <EcommerceCard
                    key={idx}
                    title={project.title}
                    project={project}
                    description={
                      today > projectTimeLine ? "Closed" : "Funding on progress"
                    }
                    instruction={today > projectTimeLine}
                    thumbnail={project.thumbnail}
                    onClick={() =>
                      navigate(`/createproject/${project.projectId}`)
                    }
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
