import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import { API } from "../config";
import TabsComponent from "../components/ui/TabsComponent";
import { emptyProjects } from "./emptyProjects"; // emptyProjects 가져오기

const MyProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(emptyProjects);
  const [selectedType, setSelectedType] = useState("On Funding");
  const token = localStorage.getItem("token");
  const [projectType, setProjectType] = useState({
    "On Funding": [],
    Closed: [],
  });
  const [userFeedback, setUserFeedback] = useState("Loading...");

  useEffect(() => {
    axios
      .get(API.READMYPROJECT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedProjects = response.data.data;

        if (fetchedProjects.length > 0) {
          const currentDate = new Date();
          const onFundingProjects = [];
          const closedProjects = [];

          fetchedProjects.forEach((project) => {
            const deadline = new Date(project.deadLine);
            if (deadline > currentDate) {
              onFundingProjects.push(project);
            } else {
              closedProjects.push(project);
            }
          });

          setProjectType({
            "On Funding": onFundingProjects,
            Closed: closedProjects,
          });
        } else {
          setUserFeedback("No projects found.");
          setProjects(emptyProjects);
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          navigate("/login");
        } else {
          setUserFeedback("An error occurred while fetching projects");
          setProjects(emptyProjects);
        }
      });
  }, [token]);

  useEffect(() => {
    const currentProjects = projectType[selectedType];
    if (currentProjects.length === 0) {
      setUserFeedback(`You don't have any project "${selectedType}" phase.`);
      setProjects(emptyProjects);
    } else {
      setUserFeedback("");
      setProjects(currentProjects);
    }
  }, [projectType, selectedType]);

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
        },
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
        <div className="mt-2 py-5">
          <div className="mx-14 md:mx-36 lg:mx-72">
            <div className="mb-3 flex items-center justify-between px-4 lg:justify-between">
              <Typography className="text-2xl font-semibold text-black">
                My Projects
              </Typography>
              <Button
                size="sm"
                className="flex h-10 items-center justify-center space-x-1 bg-black !normal-case shadow-sm hover:shadow-sm"
                onClick={createProjectHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <Typography className="text-sm font-medium text-white">
                  Add project
                </Typography>
              </Button>
            </div>
            <div className="flex items-center justify-between space-x-4 px-4">
              <Typography className="text-lg font-medium text-gray-700">
                {!userFeedback ? (
                  <>
                    You have{" "}
                    <span className="text-purple-700">
                      {projects.length} Projects
                    </span>
                  </>
                ) : (
                  userFeedback
                )}
              </Typography>
              <div className="w-72">
                <TabsComponent
                  tabs={projectType}
                  selectedTab={selectedType}
                  setSelectedTab={setSelectedType}
                />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between space-x-3 px-3"></div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {projects.length > 0 ? (
                projects.map((project, idx) => (
                  <EcommerceCard
                    key={idx}
                    project={project}
                    onClick={() =>
                      navigate(`/createproject/${project.projectId}`)
                    }
                    className="bg-white bg-opacity-10 hover:bg-gray-600 focus:bg-gray-600"
                    status={70}
                  />
                ))
              ) : (
                <Typography variant="h6" className="w-full text-center">
                  {userFeedback}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="mx-40 mt-6 px-4">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </>
  );
};

export default MyProjectsPage;
