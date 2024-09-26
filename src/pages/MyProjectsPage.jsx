import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Card } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import { API } from "../config";

const MyProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API.READMYPROJECT, {
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

  console.log(projects);

  const createProjectHandler = async (e) => {
    const token = localStorage.getItem("token");
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
      console.log(response.data.data);

      navigate(`/createproject/${response.data.data}`);
    } catch (error) {
      console.log("Error Creating Project:", error);
    }
  };

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="bg-gray-50 py-5 mt-2">
          <div className="mx-14 md:mx-36 lg:mx-60">
            <div className="flex justify-center lg:justify-start items-center pl-4 space-x-3">
              <Typography variant="h5" className="text-black">
                My Projects
              </Typography>
              <Button
                size="md"
                className="!normal-case flex justify-center items-center space-x-1"
                onClick={createProjectHandler}
              >
                {/* <Typography variant="small" className="font-medium">
                  Create Project
                </Typography> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
              {projects.map((project, idx) => {
                return (
                  <EcommerceCard
                    key={idx}
                    project={project}
                    onClick={() =>
                      navigate(`/createproject/${project.projectId}`)
                    }
                    className="bg-white bg-opacity-10 focus:bg-gray-600 hover:bg-gray-600"
                    status={70}
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
    </>
  );
};

export default MyProjectsPage;
